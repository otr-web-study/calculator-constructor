import { useDragAndDrop } from '../../futures/calcComponents/useDragAndDrop';
import './BlockContainer.css';

const BlockContainer = ({children, dragInfo, draggable=false, classes=[], extraClass=''}) => {
  const classNames = classes.join(' ');
  const [
    isAllowedDrag,
    handleDragStart,
    handleDragLeave,
    handleDragOver,
    handleDragEnd,
    handleDrop,
  ] = useDragAndDrop();

  return (
    <div 
      className={`block-container ${classNames} ${extraClass}`}
      draggable={draggable && isAllowedDrag}
      onDragStart={(e) => handleDragStart(e, dragInfo)}
      onDragLeave={(e) => handleDragLeave(e, dragInfo)}
      onDragOver={(e) => handleDragOver(e, dragInfo, classes)}
      onDragEnd={(e) => handleDragEnd(e, dragInfo)}
      onDrop={(e) => handleDrop(e, dragInfo)}>
      {children}
    </div>
  );
};

export default BlockContainer;
export const BLOCK_INACTIVE = 'block-container_inactive';
export const BLOCK_SELECTED = 'block-container_selected';