import { useAppDispatch, useAppSelector } from 'redux-hooks';

import { setMode } from './controlsSlice';
import { selectControls } from './controlsSelectors';
import { setDisplay, setStack } from './controlsSlice';

type ControlClick = (mode: string) => void;

export const useControlButton = (): [string, ControlClick] => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(selectControls);

  const handleClick = (mode: string) => {
    dispatch(setMode(mode));
    dispatch(setDisplay('0'));
    dispatch(setStack(['0']));
  }

  return [mode, handleClick];
}