import { RootState } from 'store';

export const selectControls = ({
  controls: { mode, display, stack } 
}: RootState) => ({
  mode,
  display,
  stack: [...stack],
})