import BlockContainer from '../BlockContainer';
import Button from '../Button';
import { useCalculator } from '../../futures/controls/useCalculator';
import { getNumbers } from '../../utils/utils';
import './Numbers.css';

const Numbers = (props) => {
  const { handleNumber } = useCalculator();
  const numbers = getNumbers();
  const buttons = numbers.map(title => (
    <Button key={title} onClick={() => handleNumber(title)}>
      {title}
    </Button>
  ));
  buttons.push(
    <Button 
      key='0' 
      extraClass='numbers__long-btn'
      onClick={() => handleNumber('0')}>
      0
    </Button>
  )
  buttons.push(
    <Button key='.' onClick={() => handleNumber('.')}>.</Button>
  )

  return (
    <BlockContainer {...props} extraClass='numbers'>
      {buttons}
    </BlockContainer>
  );
};

export default Numbers;