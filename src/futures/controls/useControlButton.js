import { useDispatch, useSelector } from 'react-redux';

import { selectControls, setMode } from './controlsSlice';
import { setDisplay, setStack } from './controlsSlice';

export const useControlButton = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector(selectControls);

  const handleClick = (mode) => {
    dispatch(setMode(mode));
    dispatch(setDisplay('0'));
    dispatch(setStack(['0']));
  }

  return [mode, handleClick];
}