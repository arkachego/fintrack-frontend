// Libraries
import { useEffect } from "react";
import DayJS from "dayjs";
import { Badge, Button, Card, DatePicker, Space, Table, Typography, type TableProps } from "antd";
import { EllipsisOutlined, FilterOutlined, RedoOutlined } from '@ant-design/icons';

// Actions
import {
  setListLoading,
  setListCount,
  updateExpenseList,
} from "../slices/expenseSlice";

// Constants
import { EXPENSE_STATUS_TYPE } from "../constants/expense-status-types";

// Components
import ExpenseTypeSelect from "../components/select/ExpenseTypeSelect";
import ExpenseStatusSelect from "../components/select/ExpenseStatusSelect";
import ExpenseTeamSelect from "../components/select/ExpenseTeamSelect";
import ExpenseRequestorSelect from "../components/select/ExpenseRequestorSelect";
import ExpenseApproverSelect from "../components/select/ExpenseApproverSelect";

// Hooks
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";

// Utilities
import { fetchExpenseCount, fetchExpenseResult } from "../utilities/request";
import type { ExpenseType } from "../types/ExpenseType";

const { RangePicker } = DatePicker;

const ExpensesPage: React.FC = () => {

  const dispatch = useAppDispatch();
  const search = useAppSelector(state => state.search);
  const loading = useAppSelector(state => state.expense.list.loading);
  const expenses = useAppSelector(state => state.expense.list.value);

  useEffect(() => {
    loadFirstPage();
  }, []);

  const loadFirstPage = async () => {
    try {
      dispatch(setListLoading(true));
      const { data: countResult } = await fetchExpenseCount(search);
      dispatch(setListCount(parseInt(countResult.count)));
      const { data: searchResult } = await fetchExpenseResult(search);
      dispatch(updateExpenseList(searchResult));
    }
    catch (error) {
      console.error(error);
    }
    finally {
      dispatch(setListLoading(false));
    }
  };

  const loadOtherPage = async () => {
    try {
      dispatch(setListLoading(true));
      const { data: searchResult } = await fetchExpenseResult(search);
      dispatch(updateExpenseList(searchResult.count));
    }
    catch (error) {
      console.error(error);
    }
    finally {
      dispatch(setListLoading(false));
    }
  };

  const STAMP_FORMAT = 'DD-MMM-YY hh:mm A';

  const columns: TableProps<ExpenseType>['columns'] = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: '12.5%',
      align: "center",
      render: value => value.name,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: '12.5%',
      align: "center",
      render: value => `₹ ${value}`,
    },
    {
      title: 'Team',
      dataIndex: 'team',
      key: 'team',
      width: '12.5%',
      align: "center",
      render: value => value.name,
    },
    {
      title: 'Requestor',
      dataIndex: 'requestor',
      key: 'requestor',
      width: '12.5%',
      align: "center",
      render: value => value.name,
    },
    {
      title: 'Approver',
      dataIndex: 'approver',
      key: 'approver',
      width: '12.5%',
      align: "center",
      render: value => value.name,
    },
    {
      title: 'Request Date',
      dataIndex: 'requested_at',
      key: 'requested_at',
      width: '12.5%',
      align: "center",
      render: value => DayJS(value).format(STAMP_FORMAT),
    },
    {
      title: 'Approval Date',
      dataIndex: 'approved_at',
      key: 'approved_at',
      width: '12.5%',
      align: "center",
      render: value => value ? DayJS(value).format(STAMP_FORMAT) : null,
    },
    {
      title: 'Rejection Date',
      dataIndex: 'rejected_at',
      key: 'rejected_at',
      width: '12.5%',
      align: "center",
      render: value => value ? DayJS(value).format(STAMP_FORMAT) : null,
    },
  ];

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex' }}>
      <div style={{ width: 360, flexShrink: 0, borderRight: 'thin solid #DEDEDE' }}>
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flexGrow: 1, flexBasis: 0 }}>
              <Button block>
                <RedoOutlined/>
                Reset
              </Button>
            </div>
            <div style={{ flexGrow: 1, flexBasis: 0 }}>
              <Button block type="primary">
                <FilterOutlined/>
                Filter
              </Button>
            </div>
          </div>
          <div>
            <Typography.Title level={5} style={{ marginTop: 0 }}>Expense Type</Typography.Title>
            <ExpenseTypeSelect
              disabled={loading}
            />
          </div>
          <div>
            <Typography.Title level={5} style={{ marginTop: 0 }}>Expense Status</Typography.Title>
            <ExpenseStatusSelect
              disabled={loading}
            />
          </div>
          <div>
            <Typography.Title level={5} style={{ marginTop: 0 }}>Expense Requestor</Typography.Title>
            <ExpenseRequestorSelect
              disabled={loading}
            />
          </div>
          <div>
            <Typography.Title level={5} style={{ marginTop: 0 }}>Expense Approver</Typography.Title>
            <ExpenseApproverSelect
              disabled={loading}
            />
          </div>
          <div>
            <Typography.Title level={5} style={{ marginTop: 0 }}>Spending Team</Typography.Title>
            <ExpenseTeamSelect
              disabled={loading}
            />
          </div>
          <div>
            <Typography.Title level={5} style={{ marginTop: 0 }}>Request Date</Typography.Title>
            <RangePicker
              style={{ width: '100%' }}
              placeholder={['Minimum Date', 'Maximum Date']}
              disabled={loading}
            />
          </div>
        </div>
      </div>
      <div style={{ flexGrow: 1, overflow: 'auto' }}>
        <Space direction="vertical" size={16} style={{ width: '100%', padding: 24 }}>
          {expenses.map(expense => {
            const status = expense.status?.name;
            let color = 'orange';
            if (status === EXPENSE_STATUS_TYPE.APPROVED) {
              color = 'green';
            }
            else if (status === EXPENSE_STATUS_TYPE.APPROVED) {
              color = 'red';
            }
            return (
              <Badge.Ribbon key={expense.id} text={expense.status?.name} color={color} style={{ marginTop: 10 }}>
                <Card title={expense.name} extra={(
                  <div style={{ display: 'flex', marginRight: 42 }}>
                    <Button size="small" icon={<EllipsisOutlined />} />
                  </div>
                )}>
                  {expense.details && <div style={{ marginBottom: 24 }}>{expense.details}</div>}
                  <Table<ExpenseType>
                    columns={columns}
                    dataSource={[ expense ]}
                    pagination={false}
                    bordered={true}
                    style={{ textAlign: "center" }}
                    size="small"
                  />
                </Card>
              </Badge.Ribbon>
            );
          })}
        </Space>
      </div>
    </div>
  );

};

export default ExpensesPage;
