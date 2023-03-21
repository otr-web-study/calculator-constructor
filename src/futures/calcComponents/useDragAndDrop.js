import { useSelector, useDispatch } from 'react-redux';

import { selectControls } from '../controls/controlsSlice';
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
  selectUIInfo,
} from './calcComponentsSlice';

import { INFO_BLOCK_SELECTED } from '../../components/InfoBloc';
import { 
  BLOCK_INACTIVE, BLOCK_SELECTED, BLOCK_SELECTED_TOP, BLOCK_LOCKED
} from '../../components/BlockContainer';

export const useDragAndDrop = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector(selectControls);
  const { draggedInfo, qty, ids, highlighted } = useSelector(selectUIInfo);

  const handleDragStart = (dragInfo) => {
    dispatch(setDraggedInfo(dragInfo));
  };

  const handleDragLeave = ({ panel}) => {
    if (panel === 'template') {
      return;
    }
    if (highlighted) {
      removeHighlight();
    }
  };

  const handleDragOver = (e, { panel, id}) => {
    e.preventDefault();
    if (panel === 'template') {
      return;
    }
    
    let highlightedId;
    let extraClass;

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

  const handleDrop = (e, {id, panel}) => {
    e.preventDefault();
    if (panel === 'template') {
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

  const handleDoubleClick = ({id, panel}) => {
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

  const isInfoBlock = (id) => id === 0;

  const isDisplay = (id) => id === 1;

  const highlightBlock = (id, extraClass) => {
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