import type { ExpenseFileType } from "./ExpenseFileType";
import type { ModelObjectType } from "./ModelObjectType";

export type ExpenseType = {
  id?: string;
  type_id?: string | null;
  status_id?: string | null;
  requestor_id?: string | null;
  approver_id?: string | null;
  team_id?: string | null;

  name: string;
  details: string | null;
  amount: string;

  type?: ModelObjectType;
  status?: ModelObjectType;
  requestor?: ModelObjectType;
  approver?: ModelObjectType;
  team?: ModelObjectType;
  files?: ExpenseFileType[];

  spent_at: string | null;
  requested_at?: string;
  approved_at?: string | null;
  rejected_at?: string | null;
};
