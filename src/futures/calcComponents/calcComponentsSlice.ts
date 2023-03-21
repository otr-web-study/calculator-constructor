import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { 
  CalcComponent,
  DraggedInfo,
  HighlightedInfo,
  PayloadDraggable,
  ExtraClassInfo,
} from 'types';

type CalcComponentsSlice = {
  template: CalcComponent[],
  calculator: CalcComponent[],
  infoClasses: string[],
  draggedInfo: null | DraggedInfo,
  highlighted: null | HighlightedInfo,
}

const initialState: CalcComponentsSlice = {
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
  highlighted: null,
}

const calcComponentsSlice = createSlice({
  name: 'calcComponents',
  initialState,
  reducers: {
    choseComponent: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const component = state.template.find(item => item.id === id);

      if (!component) {
        return;
      }

      state.calculator.push({
        ...component,
        classes: [],
        draggable: id !== 1,
      });
      component.draggable = false;
    },
    removeComponent: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const component = state.template.find(item => item.id === id);

      if (!component) {
        return;
      }

      component.draggable = true;
      state.calculator = state.calculator.filter(item => item.id !== id);
    },
    moveComponent: ({calculator}, action: PayloadAction<{id: number, idx: number}>) => {
      const { id, idx } = action.payload;
      const item = calculator.find(item => item.id === id);

      if (!item) {
        return;
      }

      const itemIdx = calculator.indexOf(item);
      [calculator[idx], calculator[itemIdx]] = [calculator[itemIdx], calculator[idx]];
    },
    addExtraClass: (state, action: PayloadAction<ExtraClassInfo>) => {
      const {panel, id, extraClass} = action.payload;
      const items = state[panel];
      const component = items.find(item => item.id === id);

      if (!component) {
        return;
      }

      component.classes = [...(new Set([...component.classes, extraClass]))];
    },
    removeExtraClass: (state, action: PayloadAction<ExtraClassInfo>) => {
      const {panel, id, extraClass} = action.payload;
      const component = state[panel].find(item => item.id === id);

      if (!component) {
        return;
      }

      component.classes = component.classes.filter(item => item !== extraClass);
    },
    addExtraInfoClass: (state, action: PayloadAction<string>) => {
      state.infoClasses = [...(new Set([...state.infoClasses, action.payload]))];
    },
    removeExtraInfoClass: (state, action: PayloadAction<string>) => {
      state.infoClasses = state.infoClasses.filter(item => item !== action.payload);
    },
    setDraggable: (state, action: PayloadAction<PayloadDraggable>) => {
      const { panel, id, draggable } = action.payload;
      state[panel].forEach(element => {
        if (element.id === id) {
          element.draggable = draggable;
        }
      });
    },
    setDraggedInfo: (state, action: PayloadAction<DraggedInfo>) => {
      state.draggedInfo = action.payload;
    },
    removeDraggedInfo: (state) => {
      state.draggedInfo = null;
    },
    setHighlighted: (state, action: PayloadAction<HighlightedInfo>) => {
      state.highlighted = action.payload;
    },
    removeHighlighted: (state) => {
      state.highlighted = null;
    }
  }
});

export const calcComponentsReducer = calcComponentsSlice.reducer;
export const {
  choseComponent,
  removeComponent,
  moveComponent,
  addExtraClass,
  removeExtraClass,
  addExtraInfoClass,
  removeExtraInfoClass,
  setDraggable,
  setDraggedInfo,
  setHighlighted,
  removeDraggedInfo,
  removeHighlighted,
} = calcComponentsSlice.actions;