// Libraries
import axios from 'axios';

// Types
import type { SearchType } from '../types/SearchType';
import type { ExpenseType } from '../types/ExpenseType';
import type { AnalyticsType } from '../types/AnalyticsType';
import type { FileUploadType } from '../types/FileUploadType';
import type { StatusType } from '../types/StatusType';



const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const generateSearchQuery = (payload: SearchType) => {
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

const generateAnalyticsQuery = (payload: AnalyticsType) => {
  const { granularity } = payload;
  const criteria: any[] = [];
  criteria.push({
    field: 'approved_at',
    operator: '>=',
    reference: payload.approved_at[0],
  });
  criteria.push({
    field: 'approved_at',
    operator: '<=',
    reference: payload.approved_at[1],
  });
  if (payload.type_id) {
    criteria.push({
      field: 'type_id',
      operator: '=',
      reference: payload.type_id,
    });
  }
  if (payload.team_id) {
    criteria.push({
      field: 'team_id',
      operator: '=',
      reference: payload.team_id,
    });
  }
  return { criteria, granularity };
};

export const loginUser = (email: string, password: string) => {
  return api.post('/auth/login', { email, password });
};

export const logoutUser = () => {
  return api.head('/auth/logout');
};

export const fetchProfile = () => {
  return api.get('/user/profile');
};

export const fetchExpenseCount = (payload: SearchType) => {
  const { criteria } = generateSearchQuery(payload);
  return api.post('/expense/count', { criteria });
};

export const fetchExpenseResult = (payload: SearchType) => {
  const { criteria, segment } = generateSearchQuery(payload);
  return api.post('/expense/search', { criteria, segment });
};

export const createExpense = (payload: ExpenseType) => {
  return api.post('/expense', payload);
};

export const updateStatus = (payload: StatusType) => {
  return api.patch('/expense/status', payload);
};

export const getUploadUrl = (payload: FileUploadType) => {
  return api.post('/file/upload', payload);
};

export const getDownloadUrl = (payload: FileUploadType) => {
  return api.get(`/file/download?key=${payload.name}`);
};

export const fetchAnalytics = (payload: AnalyticsType) => {
  const { criteria, granularity } = generateAnalyticsQuery(payload);
  return api.post('/expense/analytics', { criteria, granularity });
};
