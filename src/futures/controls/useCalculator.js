import { useSelector, useDispatch } from 'react-redux';

import { selectControls, setDisplay, setStack } from './controlsSlice';
import { addExtraClass, removeExtraClass } from '../calcComponents/calcComponentsSlice';

import {
  MAX_BIG_LENGTH,
  MAX_SMALL_LENGTH,
  BLOCK_SMALL,
} from '../../components/BlockContainer';

const MESSAGE_UNDEFINED = 'Не определено';

export const useCalculator = () => {
  const dispatch = useDispatch();
  let { stack, mode } = useSelector(selectControls);

  const handleNumber = (letter) => {
    if (!isRuntimeMode()) {
      return;
    }

    let top = stack.pop();

    if (top === '=') {
      stack = [];
      top = letter === '.' ? '0.' : letter;
    }
    else if (isOperation(top)) {
      stack.push(top);
      top = letter === '.' ? '0.' : letter;
    } else if (top.length < MAX_SMALL_LENGTH
              && !(top === '0' && letter === '0')) {
      top = `${top}${letter}`.replace(/^(0+)([1-9])/, '$2');
    }

    stack.push(top);
    dispatch(setStack(stack));
    formatSetDisplay(top);
  }

  const handleOperation = (operation) => {
    if (!isRuntimeMode()) {
      return;
    }
    
    const top = stack.pop();
    if (isOperation(top) || top === '=') {
      stack.push(operation);
    } else {
      stack.push(top);
      const [err, value] = evalStack();
      if (err) {
        stack = [value];
        formatSetDisplay(MESSAGE_UNDEFINED);
      } else {
        stack = [value, operation];
        formatSetDisplay(value);
      }
    }

    dispatch(setStack(stack));
  }

  const handleCalculate = () => {
    if (!isRuntimeMode()) {
      return;
    }
    const [err, value] = evalStack();
    if (err) {
      formatSetDisplay(MESSAGE_UNDEFINED);
      dispatch(setStack([value]));
    } else {
      formatSetDisplay(value);
      dispatch(setStack([value, '=']));
    }
  }

  const isRuntimeMode = () => mode === 'runtime';

  const isOperation = (term) => /^[-+/x]{1,1}$/.test(term);

  const evalStack = () => {
    let [err, res] = [false, '0'];
    try {
      res = `${eval(stack.join('').replace('x', '*'))}`;
    } catch (error) {
      console.log(err);
      err = true;
    }
    if (res === 'Infinity') {
      [err, res] = [true, '0'];
    }

    return [err, res];
  }

  const formatSetDisplay = (value) => {
    const extraClassInfo = {
      panel: 'calculator',
      id: 1,
      extraClass: BLOCK_SMALL,
    }

    if (value.length > MAX_BIG_LENGTH) {
      dispatch(addExtraClass(extraClassInfo));
    } else {
      dispatch(removeExtraClass(extraClassInfo));
    }

    if (value.length > MAX_SMALL_LENGTH) {
      if (/[+-]?([0-9]*[.])?[0-9]+/.test(value)) {
        value = `${parseFloat(value).toExponential(10)}`;
      } else {
        value = value.substr(0, MAX_SMALL_LENGTH);
      }
    }

    dispatch(setDisplay(value));
  }

  return {
    handleNumber,
    handleOperation,
    handleCalculate,
  }
}