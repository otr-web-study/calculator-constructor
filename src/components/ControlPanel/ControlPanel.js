import ControlButton from '../ControlButton';
import './ControlPanel.css'

const ControlPanel = () => {

  return (
    <div className='control-panel'>
      <ControlButton type='runtime' />
      <ControlButton type='constructor' />
    </div>
  );
}

export default ControlPanel;