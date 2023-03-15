import './Container.css';

const Container = ({ children, extraClass='' }) => (
  <div className={`container ${extraClass}`}>
    {children}
  </div>
)

export default Container;