import { useSelector } from 'react-redux';

import { selectControls } from '../../futures/controls/controlsSlice';
import BlockContainer from '../BlockContainer';
import './Display.css';

const Display = ({isChosen}) => {
  const { display } = useSelector(selectControls);

  return (
    <BlockContainer inactive={isChosen}>
      <label className='display'>{display}</label>
    </BlockContainer>
  );
};

export default Display;