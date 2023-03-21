import { RootState } from 'store';

export const selectTemplateComponents = ({ calcComponents: { template } }: RootState) => template;
export const selectCalcComponents = ({ calcComponents: { calculator }}: RootState) => calculator;
export const selectInfoClasses = ({ calcComponents: { infoClasses }}: RootState) => infoClasses;
export const selectUIInfo = ( { calcComponents: {
  draggedInfo,
  calculator,
  highlighted
} }: RootState) => ({
  draggedInfo,
  qty: calculator.length,
  ids: calculator.map(({ id }) => id) ,
  highlighted,
});