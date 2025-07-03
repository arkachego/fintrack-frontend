// Libraries
import DayJS from "dayjs";
import { useEffect } from 'react';
import { DatePicker, Drawer, Form } from 'antd';

// Components
import ExpenseTypeSelect from "../select/ExpenseTypeSelect";
import ExpenseStatusSelect from "../select/ExpenseStatusSelect";
import ExpenseTeamSelect from "../select/ExpenseTeamSelect";
import ExpenseRequestorSelect from "../select/ExpenseRequestorSelect";
import ExpenseApproverSelect from "../select/ExpenseApproverSelect";
import SubmitButton from '../button/SubmitButton';

// Actions
import { toggleSearchModal, updateFilters } from '../../slices/searchSlice';

// Constants
import { USER_TYPE } from "../../constants/user-types";
import { EXPENSE_STATUS_TYPE } from "../../constants/expense-status-types";

// Hooks
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';

// Types
import type { SearchType } from "../../types/SearchType";

const { RangePicker } = DatePicker;

const ExpenseFilter: React.FC = () => {

  const [ form ] = Form.useForm();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.global.profile.user);
  const role = useAppSelector(state => state.global.profile.role);
  const visible = useAppSelector(state => state.search.visible);
  const loading = useAppSelector(state => state.expense.list.loading);
  const search = useAppSelector(state => state.search.value);
  const pending = useAppSelector(state => state.global.options.statuses.find(s => s.label === EXPENSE_STATUS_TYPE.PENDING));
  const { show_queue } = search;

  useEffect(() => {
    if (search) {
      form.setFieldsValue(search);
    }
  }, [ search ]);

  useEffect(() => {
    if (role?.name === USER_TYPE.ADMINISTRATOR) {
      const delta: SearchType = form.getFieldsValue();
      dispatch(updateFilters({
        ...delta,
        status_id: show_queue ? pending?.value : null,
        approver_id: show_queue ? user?.id : null,
      }));
    }
  }, [ show_queue ]);

  const onClick = async () => {
    const delta: SearchType = form.getFieldsValue();
    dispatch(updateFilters(delta));
    dispatch(toggleSearchModal());
  };

  return (
    <Drawer
      closable
      destroyOnHidden
      placement='left'
      title='Filter Expenses'
      onClose={() => dispatch(toggleSearchModal())}
      open={visible}
    >
      <Form
        form={form}
        name="filter-form"
        layout="vertical"
        variant='filled'
        autoComplete="off"
        disabled={loading}
        validateTrigger={['onBlur']}
      >
        <Form.Item name="type_id" label="Category">
          <ExpenseTypeSelect
            allowClear
          />
        </Form.Item>
        <Form.Item name="status_id" label="Status">
          <ExpenseStatusSelect
            allowClear
          />
        </Form.Item>
        {role?.name === USER_TYPE.ADMINISTRATOR && (
          <Form.Item name="requestor_id" label="Requestor">
            <ExpenseRequestorSelect
              allowClear
            />
          </Form.Item>
        )}
        <Form.Item name="approver_id" label="Approver">
          <ExpenseApproverSelect
            allowClear
          />
        </Form.Item>
        <Form.Item name="team_id" label="Team">
          <ExpenseTeamSelect
            allowClear
          />
        </Form.Item>
        <Form.Item name="requested_at" label="Request Date" style={{ marginBottom: 0 }}>
          <RangePicker
            allowClear
            allowEmpty
            style={{ width: '100%' }}
            placeholder={['Minimum Date', 'Maximum Date']}
            format="DD-MMM-YY"
            maxDate={DayJS()}
          />
        </Form.Item>
        <SubmitButton
          form={form}
          onClick={onClick}
          loading={loading}
        >
          Search Expenses
        </SubmitButton>
      </Form>
    </Drawer>
  );

};

export default ExpenseFilter;
