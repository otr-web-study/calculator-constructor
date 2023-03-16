import Button from '../Button';
import BlockContainer from '../BlockContainer';
import './Calculate.css';

const Calculate = (props) => {
  return (
    <BlockContainer {...props}>
      <Button extraClass='calculate__btn'>=</Button>
    </BlockContainer>
  );
}

export default Calculate;