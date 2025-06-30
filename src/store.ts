// Libraries
import { configureStore } from '@reduxjs/toolkit';

import globalReducer from './slices/globalSlice';
import searchReducer from './slices/searchSlice';
import expenseReducer from './slices/expenseSlice';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    search: searchReducer,
    expense: expenseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
