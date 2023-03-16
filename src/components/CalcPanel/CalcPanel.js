import { useCalcPanel } from '../../futures/calcComponents/useCalcPanel';
import Container from '../Container';
import InfoBloc from '../InfoBloc';
import './CalcPanel.css';

const CalcPanel = () => {
  const [items, render] = useCalcPanel();

  const content = items.length ?
    items.map(item => render(item)) :
    <InfoBloc />

  return (
    <Container className='calc-panel'>
      {content}
    </Container>
  );
}

export default CalcPanel;