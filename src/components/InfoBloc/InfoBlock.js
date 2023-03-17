import { useSelector } from 'react-redux';

import { selectInfoClasses } from '../../futures/calcComponents/calcComponentsSlice';
import BlockContainer from '../BlockContainer';
import './InfoBlock.css';
import icon from './icon.png';

const InfoBlock = ({empty}) => {
  const classes = [...useSelector(selectInfoClasses)];
  if (empty) {
    classes.push('info-block_empty')
  }

  return (
    <BlockContainer 
      extraClass='info-block' 
      classes={classes}
      dragInfo={{panel: 'calc', id: 0}}>
      <img src={icon} alt='icon'></img>
      <p className='info-block__accent-text'>
        Перетащите сюда
      </p>
      <p className='info-block__text'>
        любой элемент из левой панели
      </p>
    </BlockContainer>
  );
};

export default InfoBlock;
export const INFO_BLOCK_SELECTED = 'info-block_selected';