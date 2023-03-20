import { useCalculator } from '../../futures/controls/useCalculator';
import Button from '../Button';
import BlockContainer from '../BlockContainer';
import './Calculate.css';

const Calculate = (props) => {
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