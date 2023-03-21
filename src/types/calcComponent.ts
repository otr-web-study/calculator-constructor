import { TypeCalcComponents } from './typeCalcComponents'

export type CalcComponent = {
  id: number,
  type: TypeCalcComponents,
  classes: string[],
  draggable: boolean,
}