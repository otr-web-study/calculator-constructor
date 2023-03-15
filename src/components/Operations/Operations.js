import BlockContainer from '../BlockContainer';
import Button from '../Button';
import './Operations.css';

const Operations = ({isChosen}) => {
  const buttons = ['/','x','+','-'].map(title => (
    <Button key={title}>
      {title}
    </Button>
  ))

  return (
    <BlockContainer inactive={isChosen} extraClass='operations'>
      {buttons}
    </BlockContainer>
  );
};

export default Operations;