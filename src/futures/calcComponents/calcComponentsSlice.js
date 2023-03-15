import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  templateComponents: [
    {
      id: 1,
      type: 'display',
      isChosen: false,
    },
    {
      id: 2,
      type: 'operations',
      isChosen: false,
    },
    {
      id: 3,
      type: 'numbers',
      isChosen: false,
    },
    {
      id: 4,
      type: 'calculate',
      isChosen: false,
    }
  ],
  calcComponents: [],
}

const calcComponentsSlice = createSlice({
  name: 'calcComponents',
  initialState,
  reducers: {
    choseComponent: (state, action) => {
      const id = action.payload;
      const component = state.templateComponents.find(item => item.id === id);
      component.isChosen = true;
      state.calcComponents.push({
        id: component.id,
        type: component.type,
      })
    }
  }
});

export const calcComponentsReducer = calcComponentsSlice.reducer;
export const { choseComponent } = calcComponentsSlice.actions;
export const selectTemplateComponents = ({ calcComponents: { templateComponents } }) => templateComponents;