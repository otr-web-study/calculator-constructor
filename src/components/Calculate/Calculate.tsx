import { useCalculator } from '../../futures/controls/useCalculator';
import Button from '../Button';
import BlockContainer from '../BlockContainer';
import './Calculate.css';
import { CalcComponentProps } from 'types';

const Calculate = (props: CalcComponentProps) => {
  const { handleCalculate } = useCalculator();

  return (
    <BlockContainer {...props}>
      <Button
        extraClass='calculate__btn'
        onClick={handleCalculate}>=</Button>
    </BlockContainer>
  );
}

export default Calculate;