export type SearchType = {
  show_queue?: boolean;
  keyword?: string | null;
  type_id?: string | null;
  status_id?: string | null;
  team_id?: string | null;
  approver_id?: string | null;
  requestor_id?: string | null;
  requested_at?: string[];
  page_value?: number;
  item_value?: number;
};
