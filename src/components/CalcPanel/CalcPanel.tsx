import { useCalcPanel } from '../../futures/calcComponents/useCalcPanel';
import Container from '../Container';
import InfoBloc from '../InfoBloc';
import './CalcPanel.css';

const CalcPanel = () => {
  const [items, render] = useCalcPanel();

  const content = items.map(item => render(item));
  if (content.length < 4) {
    content.push(<InfoBloc key={0} empty={!!content.length} />)
  }

  return (
    <Container extraClass='calc-panel'>
      {content}
    </Container>
  );
}

export default CalcPanel;