import './Button.css';

const Button = ({children, onClick, extraClass=''}) => (
  <button
    onClick={onClick}
    className={`button ${extraClass}`}>
    {children}
  </button>
);

export default Button;