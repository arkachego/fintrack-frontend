// Libraries
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Types
import type { ModelObjectType } from '../types/ModelObjectType';
import type { SelectOptionType } from '../types/SelectOptionType';
import type { MenuOptionType } from '../types/MenuOptionType';

interface GlobalState {
  profile: {
    user: ModelObjectType | null;
    role: ModelObjectType | null;
  },
  options: {
    types: SelectOptionType[] ;
    statuses: SelectOptionType[];
    teams: SelectOptionType[];
    approvers: SelectOptionType[];
    requestors: SelectOptionType[];
  },
  menu: {
    active: string | null;
    options: MenuOptionType[];
  }
}

const initialState: GlobalState = {
  profile: {
    user: null,
    role: null,
  },
  options: {
    types: [],
    statuses: [],
    teams: [],
    approvers: [],
    requestors: [],
  },
  menu: {
    active: 'expenses',
    options: [
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
  },
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    resetState: (state) => {
      state.profile = {
        user: null,
        role: null,
      };
      state.options = {
        types: [],
        statuses: [],
        teams: [],
        approvers: [],
        requestors: [],
      };
    },
    loadState: (state, action: PayloadAction<GlobalState>) => {
      state.profile = action.payload.profile;
      state.options = action.payload.options;
      state.menu.active = 'expenses';
    },
    activatePage: (state, action: PayloadAction<string>) => {
      state.menu.active = action.payload;
    },
  },
});

export const {
  resetState,
  loadState,
  activatePage,
} = globalSlice.actions;
export default globalSlice.reducer;
