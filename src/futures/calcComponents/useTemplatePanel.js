import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { selectTemplateComponents, addExtraClass } from './calcComponentsSlice';
import { selectControls } from '../controls/controlsSlice';
import { Display } from '../../components/Display';
import Operations from '../../components/Operations';
import Numbers from '../../components/Numbers';
import Calculate from '../../components/Calculate';

export const useTemplatePanel = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectTemplateComponents);
  const { mode } = useSelector(selectControls);

  useEffect(() => {
    items.map(({id}) => {
      dispatch(addExtraClass({
        id, 
        extraClass: 'block-container_type_template',
        panel: 'template',
      }));
    })
  }, []);

  const render = ({id, type, classes, draggable}) => {
    const props = {
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
        <Display value={0} {...props} />
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