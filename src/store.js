import { configureStore } from '@reduxjs/toolkit';

import { controlsReducer } from './futures/controls/controlsSlice';
import { calcComponentsReducer } from './futures/calcComponents/calcComponentsSlice';

export const store = configureStore({
  reducer: {
    controls: controlsReducer,
    calcComponents: calcComponentsReducer,
  },
});