import { useTemplatePanel } from '../../futures/calcComponents/useTemplatePanel';
import Container from '../Container';
import './TemplatePanel.css';

const TemplatePanel = () => {
  const [items, mode, render] = useTemplatePanel();

  const content = items.map((item) => render(item));
  const extraClass = `template-panel ${mode === 'runtime' ? 'template-panel_inactive' : ''}`;

  return (
    <Container extraClass={extraClass}>
      {content}
    </Container>
  );
}

export default TemplatePanel;