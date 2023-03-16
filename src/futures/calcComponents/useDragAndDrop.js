import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectControls } from '../controls/controlsSlice';
import {
  addExtraClass,
  addExtraInfoClass,
  removeExtraClass,
  removeExtraInfoClass,
  choseComponent,
} from './calcComponentsSlice';

export const useDragAndDrop = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector(selectControls);
  const [currentDragInfo, setCurrentDragInfo] = useState(null);
  console.log('render', currentDragInfo)

  const handleDragStart = (e, dragInfo) => {
    console.log('start', dragInfo)
    setCurrentDragInfo(dragInfo);
  };

  const handleDragLeave = (e, { panel, id}) => {
    if (panel === 'template') {
      return;
    }
    if (id === 0) {
      dispatch(removeExtraInfoClass('block-container_selected-full'));
    }

  };

  const handleDragOver = (e, { panel, id}) => {
    e.preventDefault();
    if (panel === 'template' || id === 1) {
      return;
    }
    if (id === 0) {
      dispatch(addExtraInfoClass('block-container_selected-full'));
    } else {
      dispatch(addExtraClass({panel: 'calculator', id, extraClass: 'block-container_selected'}));
    }

  }

  const handleDragEnd = () => {

  };

  const handleDrop = (e, {id, panel}) => {
    console.log(currentDragInfo)
    e.preventDefault();
    if (panel === 'template') {
      return;
    }
    if (id === 0) {
      dispatch(removeExtraInfoClass('block-container_selected-full'));
    }
    if (currentDragInfo.panel === 'template') {
      dispatch(choseComponent(id));
    }
  };

  return [
    mode === 'constructor',
    handleDragStart,
    handleDragLeave,
    handleDragOver,
    handleDragEnd,
    handleDrop,
  ]
}