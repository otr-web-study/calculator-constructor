import { useAppDispatch, useAppSelector } from 'redux-hooks';

import { setMode } from './controlsSlice';
import { selectControls } from './controlsSelectors';
import { setDisplay, setStack } from './controlsSlice';
import { CalcMode } from 'types';

type ControlClick = (mode: CalcMode) => void;

export const useControlButton = (): [CalcMode, ControlClick] => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(selectControls);

  const handleClick = (mode: CalcMode) => {
    dispatch(setMode(mode));
    dispatch(setDisplay('0'));
    dispatch(setStack(['0']));
  }

  return [mode, handleClick];
}