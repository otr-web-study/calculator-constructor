import { useDispatch, useSelector } from 'react-redux';

import { selectControls, setMode } from './controlsSlice';

export const useControlButton = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector(selectControls);

  const handleClick = (mode) => {
    dispatch(setMode(mode));
  }

  return [mode, handleClick];
}