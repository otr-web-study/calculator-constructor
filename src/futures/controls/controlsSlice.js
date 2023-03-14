import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'constructor',
}

const controlsSlice = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  }
});

export const controlsReducer = controlsSlice.reducer;
export const { setMode } = controlsSlice.actions;
export const selectControls = ({ controls }) => ({
  mode: controls.mode,
})