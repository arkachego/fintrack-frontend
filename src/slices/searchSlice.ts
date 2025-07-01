// Libraries
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Types
import { type SearchType } from '../types/SearchType';

type StateType = {
  visible: boolean;
  value: SearchType;
};
const initialState: StateType = {
  visible: false,
  value: {
    keyword: null,
    type_id: null,
    status_id: null,
    team_id: null,
    approver_id: null,
    requestor_id: null,
    requested_at: [],
    page_value: 1,
    item_value: 20,
  },
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetState: (state) => {
      state.visible = false;
      state.value = {
        keyword: null,
        type_id: null,
        status_id: null,
        team_id: null,
        approver_id: null,
        requestor_id: null,
        requested_at: [],
        page_value: 1,
        item_value: 20,
      };
    },
    toggleSearchModal: (state) => {
      state.visible = !state.visible;
    },
    updateKeyword: (state, action: PayloadAction<string>) => {
      state.value.keyword = action.payload || null;
    },
    updateFilters: (state, action: PayloadAction<SearchType>) => {
      state.value = {
        ...state.value,
        ...action.payload,
      };
    },
    updatePageValue: (state, action: PayloadAction<number>) => {
      state.value.page_value = action.payload;
    },
    updateItemValue: (state, action: PayloadAction<number>) => {
      state.value.item_value = action.payload;
    },
  },
});

export const {
  resetState,
  toggleSearchModal,
  updateKeyword,
  updateFilters,
  updatePageValue,
  updateItemValue,
} = searchSlice.actions;
export default searchSlice.reducer;
