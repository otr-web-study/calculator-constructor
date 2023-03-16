import { useSelector } from 'react-redux';

import { selectInfoClasses } from '../../futures/calcComponents/calcComponentsSlice';
import './InfoBlock.css';
import BlockContainer from '../BlockContainer';
import icon from './icon.png';

const InfoBlock = () => {
  const classes = useSelector(selectInfoClasses);

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