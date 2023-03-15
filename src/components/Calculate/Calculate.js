import Button from '../Button';
import BlockContainer from '../BlockContainer';
import './Calculate.css';

const Calculate = ({isChosen}) => {
  return (
    <BlockContainer inactive={isChosen}>
      <Button extraClass='calculate__btn'>=</Button>
    </BlockContainer>
  );
}

export default Calculate;