import { useDragAndDrop } from '../../futures/calcComponents/useDragAndDrop';
import './BlockContainer.css';

const BlockContainer = ({children, dragInfo, draggable=false, classes=[], extraClass=''}) => {
  const classNames = classes.join(' ');
  const [
    isAllowedDrag,
    handleDragStart,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleDoubleClick
  ] = useDragAndDrop();

  return (
    <div 
      className={`block-container ${classNames} ${extraClass}`}
      draggable={draggable && isAllowedDrag}
      onDragStart={() => handleDragStart(dragInfo)}
      onDragLeave={() => handleDragLeave(dragInfo)}
      onDragOver={(e) => handleDragOver(e, dragInfo)}
      onDoubleClick={() => handleDoubleClick(dragInfo)}
      onDrop={(e) => handleDrop(e, dragInfo)}>
      {children}
    </div>
  );
};

export default BlockContainer;
export const BLOCK_INACTIVE = 'block-container_inactive';
export const BLOCK_SELECTED = 'block-container_selected';
export const BLOCK_SELECTED_TOP = 'block-container_selected-top';