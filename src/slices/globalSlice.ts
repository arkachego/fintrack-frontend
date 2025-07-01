// Libraries
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Types
import { type ModelObjectType } from '../types/ModelObjectType';

interface GlobalState {
  user: ModelObjectType | null;
  type: ModelObjectType | null;
  active: string | null;
  menu?: any[];
}

const initialState: GlobalState = {
  user: null,
  type: null,
  active: 'expenses',
  menu: [
    {
      key: 'expenses',
      label: 'Expenses',
      url: '/expenses',
    },
    {
      key: 'analytics',
      label: 'Analytics',
      url: '/analytics',
    },
  ],
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    resetState: (state) => {
      state.user = null;
      state.type = null;
      state.active = null;
    },
    loadState: (state, action: PayloadAction<GlobalState>) => {
      state.user = action.payload.user;
      state.type = action.payload.type;
    },
    activatePage: (state, action: PayloadAction<string>) => {
      state.active = action.payload;
    },
  },
});

export const {
  resetState,
  loadState,
  activatePage,
} = globalSlice.actions;
export default globalSlice.reducer;
