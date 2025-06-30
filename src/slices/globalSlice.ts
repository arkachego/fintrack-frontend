// Libraries
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Constants
import { USER_TYPE } from '../constants/user-types';

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
  active: null,
  menu: [],
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    resetState: (state) => {
      state.user = null;
      state.type = null;
      state.active = null;
      state.menu = [];
    },
    loadState: (state, action: PayloadAction<GlobalState>) => {
      state.user = action.payload.user;
      state.type = action.payload.type;
      const newMenu = [
        {
          key: 'expenses',
          label: 'Expenses',
          url: '/expenses',
        },
      ];
      if (action.payload.type?.name === USER_TYPE.ADMINISTRATOR) {
        newMenu.push({
          key: 'analytics',
          label: 'Analytics',
          url: '/analytics',
        });
      }
      state.active = newMenu[0].key;
      state.menu = newMenu;
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
