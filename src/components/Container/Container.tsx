import { ReactNode } from 'react';

import './Container.css';

type ContainerProps = {
  children: ReactNode,
  extraClass: string,
}

const Container = ({ children, extraClass='' }: ContainerProps) => (
  <div className={`container ${extraClass}`}>
    {children}
  </div>
)

export default Container;