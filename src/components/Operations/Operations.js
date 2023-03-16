import BlockContainer from '../BlockContainer';
import Button from '../Button';
import './Operations.css';

const Operations = (props) => {
  const buttons = ['/','x','+','-'].map(title => (
    <Button key={title}>
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