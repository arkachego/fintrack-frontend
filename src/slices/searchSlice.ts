// Libraries
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Types
import { type SearchType } from '../types/SearchType';

const initialState: SearchType = {
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

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetState: (state) => {
      state.keyword = null;
      state.type_id = null;
      state.status_id = null;
      state.team_id = null;
      state.approver_id = null;
      state.requestor_id = null;
      state.requested_at = [];
      state.page_value = 1;
      state.item_value = 20;
    },
    updateKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload || null;
    },
    updateTypeId: (state, action: PayloadAction<string | null>) => {
      state.type_id = action.payload;
    },
    updateStatusId: (state, action: PayloadAction<string | null>) => {
      state.status_id = action.payload;
    },
    updateTeamId: (state, action: PayloadAction<string | null>) => {
      state.team_id = action.payload;
    },
    updateApproverId: (state, action: PayloadAction<string | null>) => {
      state.approver_id = action.payload;
    },
    updateRequestorId: (state, action: PayloadAction<string | null>) => {
      state.requestor_id = action.payload;
    },
    updateRequestedAt: (state, action: PayloadAction<string[]>) => {
      state.requested_at = action.payload;
    },
    updatePageValue: (state, action: PayloadAction<number>) => {
      state.page_value = action.payload;
    },
    updateItemValue: (state, action: PayloadAction<number>) => {
      state.item_value = action.payload;
    },
  },
});

export const {
  resetState,
  updateKeyword,
  updateTypeId,
  updateStatusId,
  updateTeamId,
  updateApproverId,
  updateRequestorId,
  updateRequestedAt,
  updatePageValue,
  updateItemValue,
} = searchSlice.actions;
export default searchSlice.reducer;
