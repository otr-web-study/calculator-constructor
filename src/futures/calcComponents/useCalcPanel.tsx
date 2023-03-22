import { useAppSelector } from 'redux-hooks';
import { selectCalcComponents } from './calcComponentsSelectors';
import { selectControls } from '../controls/controlsSelectors';
import { Display, ActiveDisplay } from '../../components/Display';
import Operations from '../../components/Operations';
import Numbers from '../../components/Numbers';
import Calculate from '../../components/Calculate';
import { CalcComponent, CalcComponentProps } from 'types';

export const useCalcPanel = (): [
  CalcComponent[],
  (element:CalcComponent) => JSX.Element | null,
] => {
  const items = useAppSelector(selectCalcComponents);
  const { mode } = useAppSelector(selectControls);

  const render = ({id, type, classes, draggable}: CalcComponent) => {
    const props: CalcComponentProps = {
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
          <Display {...props} />
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