import { useDispatch, useSelector } from 'react-redux';

import { selectTemplateComponents } from './calcComponentsSlice';
import { selectControls } from '../controls/controlsSlice';
import Display from '../../components/Display/Display';
import Operations from '../../components/Operations';
import Numbers from '../../components/Numbers/Numbers';
import Calculate from '../../components/Calculate/Calculate';

export const useTemplatePanel = () => {
  const items = useSelector(selectTemplateComponents);
  const { mode } = useSelector(selectControls);

  const render = ({id, type, isChosen}) => {
    switch(type) {
    case 'display':
      return (
        <Display key={id} isChosen={isChosen} />
      )
    case 'operations':
      return (
        <Operations key={id} isChosen={isChosen} />
      )
    case 'numbers':
      return (
        <Numbers key={id} isChosen={isChosen} />
      )
    case 'calculate':
      return (
        <Calculate key={id} isChosen={isChosen} />
      )
    default:
      return null;
    }
  }

  return [items, mode, render];
}