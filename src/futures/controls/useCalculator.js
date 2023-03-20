import { useSelector, useDispatch } from 'react-redux';

import { selectControls, setDisplay, setStack } from './controlsSlice';

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
    } else if (top.length < 9) {
      top = `${top}${letter}`.replace(/^(0+)([1-9])/, '$2');
    }

    stack.push(top);
    dispatch(setStack(stack));
    dispatch(setDisplay(top));
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
        dispatch(setDisplay('Не определено'))
      } else {
        stack = [value, operation];
        dispatch(setDisplay(formatValue(value)));
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
      dispatch(setDisplay('Не определено'));
      dispatch(setStack[value]);
    } else {
      dispatch(setDisplay(formatValue(value)));
      dispatch(setStack([value, '=']));
    }
  }

  const isRuntimeMode = () => mode === 'runtime';

  const isOperation = (term) => new RegExp(/^[-+/x]{1,1}$/).test(term);

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

  const formatValue = (value) => value.slice(0, 9);

  return {
    handleNumber,
    handleOperation,
    handleCalculate,
  }
}