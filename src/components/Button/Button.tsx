import { ReactNode } from 'react';

import './Button.css';

type ButtonProps = {
  children: ReactNode, 
  onClick: () => void,
  extraClass?: string,
}

const Button = ({children, onClick, extraClass=''}: ButtonProps) => (
  <button
    onClick={onClick}
    className={`button ${extraClass}`}>
    {children}
  </button>
);

export default Button;