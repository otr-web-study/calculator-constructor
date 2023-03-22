import { useSelector } from 'react-redux';

import { selectControls } from '../../futures/controls/controlsSelectors';
import './Display.css';
import BlockContainer from '../BlockContainer';
import { CalcComponentProps } from 'types';

type DisplayProps = {
  value?: string
} & CalcComponentProps;

export const Display = (props: DisplayProps) => {
  const { value = '0' } = props;

  return (
    <BlockContainer {...props}>
      <label className='display'>{value}</label>
    </BlockContainer>
  )
};

export const ActiveDisplay = (props: CalcComponentProps) => {
  const { display } = useSelector(selectControls);

  return <Display value={display} {...props} />
}