import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'constructor',
  display: '0',
  stack: ['0'],
}

const controlsSlice = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setDisplay: (state, action) => {
      state.display = action.payload;
    },
    setStack: (state, action) => {
      state.stack = action.payload;
    }
  }
});

export const controlsReducer = controlsSlice.reducer;
export const { setMode, setDisplay, setStack } = controlsSlice.actions;
export const selectControls = ({
  controls: { mode, display, stack } 
}) => ({
  mode,
  display,
  stack: [...stack],
})