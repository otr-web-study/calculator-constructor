import { configureStore } from '@reduxjs/toolkit';

import { controlsReducer } from './futures/controls/controlsSlice';

export const store = configureStore({
  reducer: {
    controls: controlsReducer,
  },
});