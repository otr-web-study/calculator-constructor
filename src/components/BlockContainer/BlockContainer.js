import './BlockContainer.css';

const BlockContainer = ({children, inactive=false, extraClass=''}) => {
  const inactiveClass = inactive ? 'block-container_inactive' : '';

  return (
    <div className={`block-container ${inactiveClass} ${extraClass}`}>
      {children}
    </div>
  );
};

export default BlockContainer;