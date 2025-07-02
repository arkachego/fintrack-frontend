// Libraries
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Types
import type { ExpenseType } from '../types/ExpenseType';

type ListType = {
  loading: boolean;
  count: number;
  value: ExpenseType[];
};

type ActiveType = {
  visible: boolean;
  loading: boolean;
  value: ExpenseType | null;
};

interface ExpenseState {
  list: ListType;
  active: ActiveType;
};

const DEFAULT_EXPENSE: ExpenseType = {
  type_id: null,
  status_id: null,
  requestor_id: null,
  approver_id: null,
  team_id: null,
  name: '',
  details: null,
  amount: '',
  attachment: null,
  spent_at: null,
};

const initialState: ExpenseState = {
  list: {
    loading: false,
    count: 0,
    value: [],
  },
  active: {
    visible: false,
    loading: false,
    value: null,
  },
};

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    resetState: (state) => {
      state.list = {
        loading: false,
        count: 0,
        value: [],
      };
      state.active = {
        visible: false,
        loading: false,
        value: null,
      };
    },
    setListLoading: (state, action: PayloadAction<boolean>) => {
      state.list.loading = action.payload;
    },
    setListCount: (state, action: PayloadAction<number>) => {
      state.list.count = action.payload;
    },
    updateExpenseList: (state, action: PayloadAction<ExpenseType[]>) => {
      state.list.value = action.payload;
    },
    setActiveLoading: (state) => {
      state.active.loading = true;
    },
    openExpenseModal: (state, action: PayloadAction<ExpenseType | undefined>) => {
      state.active.value = action.payload ? {
        id: action.payload.id,
        type_id: action.payload.type?.id,
        status_id: action.payload.status?.id,
        requestor_id: action.payload.requestor?.id,
        approver_id: action.payload.approver?.id,
        team_id: action.payload.team?.id,
        name: action.payload.name,
        details: action.payload.details,
        amount: action.payload.amount,
        attachment: action.payload.attachment,
        spent_at: action.payload.spent_at,
      } as ExpenseType : DEFAULT_EXPENSE;
    },
    closeExpenseModal: (state) => {
      state.active = {
        visible: false,
        loading: false,
        value: null,
      };
    },
  },
});

export const {
  resetState,
  setListLoading,
  setListCount,
  updateExpenseList,
  setActiveLoading,
  openExpenseModal,
  closeExpenseModal,
} = expenseSlice.actions;
export default expenseSlice.reducer;
