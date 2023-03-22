import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CalcMode } from 'types';

type ControlsSlice = {
  mode: CalcMode,
  display: string,
  stack: string[],
}

const initialState: ControlsSlice = {
  mode: 'constructor',
  display: '0',
  stack: ['0'],
}

const controlsSlice = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<CalcMode>) => {
      state.mode = action.payload;
    },
    setDisplay: (state, action: PayloadAction<string>) => {
      state.display = action.payload;
    },
    setStack: (state, action: PayloadAction<string[]>) => {
      state.stack = action.payload;
    }
  }
});

export const controlsReducer = controlsSlice.reducer;
export const { setMode, setDisplay, setStack } = controlsSlice.actions;
