import { useSelector } from 'react-redux';

import { selectInfoClasses } from 'futures/calcComponents/calcComponentsSelectors';
import BlockContainer from '../BlockContainer';
import './InfoBlock.css';
import icon from './icon.png';

type InfoBlockProps = {
  empty: boolean
}

const InfoBlock = ({empty}: InfoBlockProps) => {
  const classes = [...useSelector(selectInfoClasses)];
  if (empty) {
    classes.push('info-block_empty')
  }

  return (
    <BlockContainer 
      extraClass='info-block' 
      classes={classes}
      dragInfo={{panel: 'calculator', id: 0}}>
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