import './ControlButton.css';
import { useControlButton } from '../../futures/controls/useControlButton';
import { capitalize } from '../../utils/utils';
import { CalcMode } from 'types';

type ControlButtonProps = {
  type: CalcMode
}

const ControlButton = ({ type }: ControlButtonProps) => {
  const [mode, onClick] = useControlButton();
  const activeClass = type === mode ? 'control-button_active' : '';

  return (
    <button 
      className={`control-button ${activeClass}`}
      onClick={() => onClick(type)}>
      <span className={`control-button__icon-${type}`}></span>
      {capitalize(type)}
    </button>
  )
}

export default ControlButton;