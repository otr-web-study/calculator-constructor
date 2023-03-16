import { useSelector } from 'react-redux';

import { selectCalcComponents } from './calcComponentsSlice';
import { selectControls } from '../controls/controlsSlice';
import { Display, ActiveDisplay } from '../../components/Display';
import Operations from '../../components/Operations';
import Numbers from '../../components/Numbers';
import Calculate from '../../components/Calculate';

export const useCalcPanel = () => {
  const items = useSelector(selectCalcComponents);
  const { mode } = useSelector(selectControls);

  const render = ({id, type, classes, draggable}) => {
    const props = {
      dragInfo: {
        panel: 'calculator',
        id
      },
      classes,
      draggable,
      key: id,
    }

    switch(type) {
    case 'display':
      return (
        mode === 'runtime' ?
          <ActiveDisplay {...props} /> :
          <Display {...props} value={0} />
      )
    case 'operations':
      return (
        <Operations {...props} />
      )
    case 'numbers':
      return (
        <Numbers {...props} />
      )
    case 'calculate':
      return (
        <Calculate {...props} />
      )
    default:
      return null;
    }
  }

  return [items, render];
}