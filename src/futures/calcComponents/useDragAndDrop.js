import { useSelector, useDispatch } from 'react-redux';

import { selectControls } from '../controls/controlsSlice';
import {
  addExtraClass,
  addExtraInfoClass,
  removeExtraClass,
  removeExtraInfoClass,
  choseComponent,
  setDraggedInfo,
  removeDraggedInfo,
  selectDraggedInfo,
} from './calcComponentsSlice';

import { INFO_BLOCK_SELECTED } from '../../components/InfoBloc';
import { BLOCK_INACTIVE, BLOCK_SELECTED } from '../../components/BlockContainer';

export const useDragAndDrop = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector(selectControls);
  const draggedInfo = useSelector(selectDraggedInfo);

  const handleDragStart = (e, dragInfo) => {
    dispatch(setDraggedInfo(dragInfo));
  };

  const handleDragLeave = (e, { panel, id}) => {
    if (panel === 'template') {
      return;
    }

    if (isInfoBlock(id)) {
      dispatch(removeExtraInfoClass(INFO_BLOCK_SELECTED));
    } else {
      dispatch(removeExtraClass({panel: 'calculator', id, extraClass: BLOCK_SELECTED}))
    }

  };

  const handleDragOver = (e, { panel, id}, classes) => {
    e.preventDefault();
    if (panel === 'template') {
      return;
    }

    if (isInfoBlock(id)) {
      dragOverInfoBlock(classes);
    } else {
      dragOverBlock(id, classes);
    }
  }

  const handleDragEnd = () => {

  };

  const handleDrop = (e, {id, panel}) => {
    e.preventDefault();
    e.stopPropagation();
    if (panel === 'template') {
      return;
    }

    if (isInfoBlock(id)) {
      dropInfoBlock();
    } else {
      dropBlock(id)
    }

    if (draggedInfo.panel === 'template') {
      dispatch(choseComponent(draggedInfo.id));
      dispatch(addExtraClass({
        panel: 'template',
        id: draggedInfo.id,
        extraClass: BLOCK_INACTIVE,
      }))
    }
  };

  const isInfoBlock = (id) => id === 0;

  const dragOverInfoBlock = (classes) => {
    if (classes.includes(INFO_BLOCK_SELECTED)) {
      return;
    }

    dispatch(addExtraInfoClass(INFO_BLOCK_SELECTED));

  }

  const dragOverBlock = (id, classes) => {
    if (classes.includes(BLOCK_SELECTED)) {
      return;
    }

    dispatch(addExtraClass({
      panel: 'calculator',
      id, 
      BLOCK_SELECTED,
    }))
  }

  const dropInfoBlock = () => {
    dispatch(removeExtraInfoClass(INFO_BLOCK_SELECTED));
  }

  const dropBlock = (id, classes) => {

  }

  return [
    mode === 'constructor',
    handleDragStart,
    handleDragLeave,
    handleDragOver,
    handleDragEnd,
    handleDrop,
  ]
}