import { useAppDispatch, useAppSelector } from 'redux-hooks';
import { useEffect } from 'react';

import { addExtraClass } from './calcComponentsSlice';
import { selectTemplateComponents } from './calcComponentsSelectors';
import { selectControls } from '../controls/controlsSelectors';
import { Display } from '../../components/Display';
import Operations from '../../components/Operations';
import Numbers from '../../components/Numbers';
import Calculate from '../../components/Calculate';
import { CalcComponent, CalcComponentProps } from 'types';

export const useTemplatePanel = (): [
  CalcComponent[],
  string,
  (element: CalcComponent) => JSX.Element | null,
] => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectTemplateComponents);
  const { mode } = useAppSelector(selectControls);

  useEffect(() => {
    items.map(({id}) => {
      dispatch(addExtraClass({
        id, 
        extraClass: 'block-container_type_template',
        panel: 'template',
      }));
    })
  }, []);

  const render = ({id, type, classes, draggable}: CalcComponent) => {
    const props: CalcComponentProps = {
      dragInfo: {
        panel: 'template',
        id
      },
      classes,
      draggable,
      key: id,
    }

    switch(type) {
    case 'display':
      return (
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

  return [items, mode, render];
}