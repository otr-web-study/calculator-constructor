import BlockContainer from '../BlockContainer';
import Button from '../Button';
import { getNumbers } from '../../utils/utils';
import './Numbers.css';

const Numbers = (props) => {
  const numbers = getNumbers();
  const buttons = numbers.map(title => (
    <Button key={title}>
      {title}
    </Button>
  ));
  buttons.push(
    <Button key='0' extraClass='numbers__long-btn'>
      0
    </Button>
  )
  buttons.push(
    <Button key='.'>.</Button>
  )

  return (
    <BlockContainer {...props} extraClass='numbers'>
      {buttons}
    </BlockContainer>
  );
};

export default Numbers;