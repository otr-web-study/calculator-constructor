import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  template: [
    {
      id: 1,
      type: 'display',
      classes: [],
      draggable: true,
    },
    {
      id: 2,
      type: 'operations',
      classes: [],
      draggable: true,
    },
    {
      id: 3,
      type: 'numbers',
      classes: [],
      draggable: true,
    },
    {
      id: 4,
      type: 'calculate',
      classes: [],
      draggable: true,
    }
  ],
  calculator: [],
  infoClasses: [],
  draggedInfo: null,
}

const calcComponentsSlice = createSlice({
  name: 'calcComponents',
  initialState,
  reducers: {
    choseComponent: (state, action) => {
      const id = action.payload;
      const component = state.template.find(item => item.id === id);
      state.calculator.push({
        ...component,
        classes: [],
      });
      component.draggable = false;
    },
    moveComponent: ({calculator}, action) => {
      const { id, idx } = action.payload;
      const itemIdx = calculator.indexOf(calculator.find(item => item.id === id));
      [calculator[idx], calculator[itemIdx]] = [calculator[itemIdx], calculator[idx]];
    },
    addExtraClass: (state, action) => {
      const {panel, id = null, extraClass} = action.payload;
      const items = state[panel];
      const component = items.find(item => item.id === id);
      component.classes = [...(new Set([...component.classes, extraClass]))];
    },
    removeExtraClass: (state, action) => {
      const {panel, id, extraClass} = action.payload;
      const component = state[panel].find(item => item.id === id);
      component.classes = component.classes.filter(item => item !== extraClass);
    },
    addExtraInfoClass: (state, action) => {
      state.infoClasses = [...(new Set([...state.infoClasses, action.payload]))];
    },
    removeExtraInfoClass: (state, action) => {
      state.infoClasses = state.infoClasses.filter(item => item !== action.payload);
    },
    setDraggable: (state, action) => {
      const { panel, id, draggable } = action.payload;
      state[panel].forEach(element => {
        if (element.id === id) {
          element.draggable = draggable;
        }
      });
    },
    setDraggedInfo: (state, action) => {
      state.draggedInfo = action.payload;
    },
    removeDraggedInfo: (state) => {
      state.draggedInfo = null;
    }
  }
});

export const calcComponentsReducer = calcComponentsSlice.reducer;
export const {
  choseComponent,
  addExtraClass,
  removeExtraClass,
  addExtraInfoClass,
  removeExtraInfoClass,
  setDraggable,
  setDraggedInfo,
  removeDraggedInfo,
} = calcComponentsSlice.actions;
export const selectTemplateComponents = ({ calcComponents: { template } }) => template;
export const selectCalcComponents = ({ calcComponents: { calculator }}) => calculator;
export const selectInfoClasses = ({ calcComponents: { infoClasses }}) => infoClasses;
export const selectDraggedInfo = ({ calcComponents: { draggedInfo }}) => draggedInfo;