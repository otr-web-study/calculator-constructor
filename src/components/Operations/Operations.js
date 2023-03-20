import { useCalculator } from '../../futures/controls/useCalculator';
import BlockContainer from '../BlockContainer';
import Button from '../Button';
import './Operations.css';

const Operations = (props) => {
  const { handleOperation } = useCalculator();
  const buttons = ['/','x','+','-'].map(title => (
    <Button key={title} onClick={() => handleOperation(title)}>
      {title}
    </Button>
  ))

  return (
    <BlockContainer {...props} extraClass='operations'>
      {buttons}
    </BlockContainer>
  );
};

export default Operations;