// Libraries
import axios from 'axios';

// Types
import type { SearchType } from '../types/SearchType';
import type { ExpenseType } from '../types/ExpenseType';

const api = axios.create({
  baseURL: import.meta.env.SERVER_API_BASE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const generateQuery = (payload: SearchType) => {
  const segment = {
    page: payload.page_value,
    item: payload.item_value,
  };
  const criteria: any[] = [];
  if (payload.keyword) {
    criteria.push({
      field: 'name',
      operator: 'ilike',
      reference: payload.keyword,
    });
  }
  if (payload.type_id) {
    criteria.push({
      field: 'type_id',
      operator: '=',
      reference: payload.type_id,
    });
  }
  if (payload.status_id) {
    criteria.push({
      field: 'status_id',
      operator: '=',
      reference: payload.status_id,
    });
  }
  if (payload.approver_id) {
    criteria.push({
      field: 'approver_id',
      operator: '=',
      reference: payload.approver_id,
    });
  }
  if (payload.requestor_id) {
    criteria.push({
      field: 'requestor_id',
      operator: '=',
      reference: payload.requestor_id,
    });
  }
  if (payload.team_id) {
    criteria.push({
      field: 'team_id',
      operator: '=',
      reference: payload.team_id,
    });
  }
  if (payload.requested_at?.length) {
    criteria.push({
      field: 'requested_at',
      operator: '>=',
      reference: payload.requested_at[0],
    });
    criteria.push({
      field: 'requested_at',
      operator: '<=',
      reference: payload.requested_at[1],
    });
  }
  return { segment, criteria };
};

export const loginUser = (email: string, password: string) => {
  return api.post('/auth/login', { email, password });
};

export const logoutUser = () => {
  return api.head('/auth/logout');
};

export const fetchExpenseTeams = () => {
  return api.get('/user/teams');
};

export const fetchExpenseApprovers = () => {
  return api.get('/user/approvers');
};

export const fetchExpenseRequestors = () => {
  return api.get('/user/requestors');
};

export const fetchExpenseTypes = () => {
  return api.get('/expense/types');
};

export const fetchExpenseStatuses = () => {
  return api.get('/expense/statuses');
};

export const fetchExpenseCount = (payload: SearchType) => {
  const { criteria } = generateQuery(payload);
  return api.post('/expense/count', { criteria });
};

export const fetchExpenseResult = (payload: SearchType) => {
  const { criteria, segment } = generateQuery(payload);
  return api.post('/expense/search', { criteria, segment });
};

export const createExpense = (payload: ExpenseType) => {
  return api.post('/expense', payload);
};

export const updateStatus = (payload: ExpenseType) => {
  return api.patch('/expense/status', payload);
};
