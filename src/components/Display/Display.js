import { useSelector } from 'react-redux';

import { selectControls } from '../../futures/controls/controlsSlice';
import BlockContainer from '../BlockContainer';
import './Display.css';

export const Display = (props) => {
  const { value } = props;

  return (
    <BlockContainer {...props}>
      <label className='display'>{value}</label>
    </BlockContainer>
  )
};

export const ActiveDisplay = (props) => {
  const { display } = useSelector(selectControls);

  return <Display value={display} {...props} />
}