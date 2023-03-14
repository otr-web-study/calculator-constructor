import './InfoBlock.css';
import icon from './icon.png';

const InfoBlock = () => (
  <div className='info-block'>
    <img src={icon} alt='icon'></img>
    <p className='info-block__accent-text'>
      Перетащите сюда
    </p>
    <p className='info-block__text'>
      любой элемент из левой панели
    </p>
  </div>
);

export default InfoBlock;