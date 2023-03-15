import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'constructor',
  display: '0',
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
    }
  }
});

export const controlsReducer = controlsSlice.reducer;
export const { setMode } = controlsSlice.actions;
export const selectControls = ({
  controls: { mode, display } 
}) => ({
  mode,
  display,
})