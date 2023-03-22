import { DragEvent } from 'react';

import { useAppDispatch, useAppSelector } from 'redux-hooks';
import { selectControls } from '../controls/controlsSelectors';
import {
  addExtraClass,
  addExtraInfoClass,
  removeExtraClass,
  removeExtraInfoClass,
  removeDraggedInfo,
  removeHighlighted,
  removeComponent,
  choseComponent,
  moveComponent,
  setDraggedInfo,
  setHighlighted,
} from './calcComponentsSlice';
import { selectUIInfo } from './calcComponentsSelectors';
import { DraggedInfo } from 'types';

import { INFO_BLOCK_SELECTED } from '../../components/InfoBloc';
import { 
  BLOCK_INACTIVE, BLOCK_SELECTED, BLOCK_SELECTED_TOP, BLOCK_LOCKED
} from '../../components/BlockContainer';

export const useDragAndDrop = (): [
  boolean,
  (dragInfo: DraggedInfo) => void,
  (dragInfo: DraggedInfo) => void,
  (e: DragEvent<HTMLDivElement>, dragInfo: DraggedInfo) => void,
  (e: DragEvent<HTMLDivElement>, dragInfo: DraggedInfo) => void,
  (dragInfo: DraggedInfo) => void,
] => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(selectControls);
  const { draggedInfo, qty, ids, highlighted } = useAppSelector(selectUIInfo);

  const handleDragStart = (dragInfo: DraggedInfo) => {
    dispatch(setDraggedInfo(dragInfo));
  };

  const handleDragLeave = ({ panel}: DraggedInfo) => {
    if (panel === 'template') {
      return;
    }
    if (highlighted) {
      removeHighlight();
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, { panel, id}: DraggedInfo) => {
    e.preventDefault();
    if (panel === 'template') {
      return;
    }

    if (!draggedInfo) {
      return;
    }
    
    let highlightedId: number;
    let extraClass: string;

    if (!qty) {
      highlightedId = 0;
      extraClass = INFO_BLOCK_SELECTED;
    } else if (isDisplay(draggedInfo.id)) {
      highlightedId = ids[0];
      extraClass = BLOCK_SELECTED_TOP;
    } else if (isDisplay(id)) {
      highlightedId = id;
      extraClass = BLOCK_LOCKED;
      e.dataTransfer.dropEffect = 'none';
    } else if (isInfoBlock(id)) {
      highlightedId = ids[qty - 1];
      extraClass = BLOCK_SELECTED;
    } else {
      const indexId = ids.indexOf(id);
      if (!indexId) {
        highlightedId = ids[indexId];
        extraClass = BLOCK_SELECTED_TOP;
      } else {
        highlightedId = ids[indexId - 1];
        extraClass = BLOCK_SELECTED;
      }
    }

    highlightBlock(highlightedId, extraClass); 
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>, {id, panel}: DraggedInfo) => {
    e.preventDefault();
    if (panel === 'template') {
      return;
    }

    if (!draggedInfo) {
      return;
    }

    if (draggedInfo.panel === 'template') {
      dispatch(choseComponent(draggedInfo.id));
      dispatch(addExtraClass({
        panel: 'template',
        id: draggedInfo.id,
        extraClass: BLOCK_INACTIVE,
      }));
      if (isDisplay(draggedInfo.id)) {
        dispatch(moveComponent({id: draggedInfo.id, idx: 0}))
      }
      dispatch(removeDraggedInfo());
    } else if(!isDisplay(id)) {
      const idx = ids.indexOf(id);
      if (idx !== ids.indexOf(draggedInfo.id)) {
        dispatch(moveComponent({id: draggedInfo.id, idx}));
      }
    }

    removeHighlight();
  };

  const handleDoubleClick = ({id, panel}: DraggedInfo) => {
    if (panel === 'template' || mode === 'runtime') {
      return;
    }

    dispatch(removeComponent(id));
    dispatch(removeExtraClass({
      panel: 'template',
      id,
      extraClass: BLOCK_INACTIVE,
    }))
  }

  const isInfoBlock = (id: number) => id === 0;

  const isDisplay = (id: number) => id === 1;

  const highlightBlock = (id: number, extraClass: string) => {
    if (isInfoBlock(id)) {
      dispatch(addExtraInfoClass(extraClass));
    } else {
      dispatch(addExtraClass({
        id,
        extraClass,
        panel: 'calculator'
      }))
    }

    dispatch(setHighlighted({id, extraClass}));
  }

  const removeHighlight = () => {
    if (!highlighted) {
      return;
    }

    if (isInfoBlock(highlighted.id)) {
      dispatch(removeExtraInfoClass(highlighted.extraClass));
    } else {
      dispatch(removeExtraClass({
        ...highlighted,
        panel: 'calculator',
      }));
    }
    dispatch(removeHighlighted());
  }

  return [
    mode === 'constructor',
    handleDragStart,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleDoubleClick,
  ]
}