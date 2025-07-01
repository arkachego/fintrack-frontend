// Libraries
import DayJS from "dayjs";
import { useEffect } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import {
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Typography,
  Upload,
  type UploadProps,
} from 'antd';

// Components
import ExpenseTypeSelect from "../select/ExpenseTypeSelect";
import ExpenseTeamSelect from "../select/ExpenseTeamSelect";
import ExpenseApproverSelect from "../select/ExpenseApproverSelect";
import SubmitButton from '../button/SubmitButton';

// Actions
import { closeExpenseModal } from '../../slices/expenseSlice';
import { resetState as resetSearchState } from '../../slices/searchSlice';

// Hooks
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';

// Utilities
import { createExpense } from "../../utilities/request";

const { TextArea } = Input;
const { Dragger } = Upload;

const ExpenseForm: React.FC = () => {

  const [ form ] = Form.useForm();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.expense.active.loading);
  const expense = useAppSelector(state => state.expense.active.value);

  useEffect(() => {
    if (expense) {
      form.setFieldsValue({
        ...expense,
        spent_at: expense.spent_at ? DayJS(expense.spent_at) : null,
      });
    }
  }, [ expense ]);

  const onClick = async () => {
    try {
      const payload = form.getFieldsValue();
      await createExpense({
        ...payload,
        spent_at: payload.spent_at.toISOString(),
      });
      dispatch(resetSearchState());
      dispatch(closeExpenseModal());
    }
    catch (error) {
      console.error(error);
    }
  };

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Drawer
      closable
      destroyOnHidden
      title={expense?.id ? expense?.name : 'Add new Expense'}
      onClose={() => dispatch(closeExpenseModal())}
      open={expense !== null}
    >
      <Form
        form={form}
        name="expense-form"
        layout="vertical"
        variant='filled'
        autoComplete="off"
        disabled={loading}
        validateTrigger={['onBlur']}
      >
        <Form.Item name="name" label="Title" rules={[{ required: true, max: 50 }]}>
          <Input
            disabled={loading}
          />
        </Form.Item>
        <Form.Item name="amount" label="Amount" rules={[{ required: true, min: 1, max: 20000 }]}>
          <InputNumber<string>
            stringMode
            step="0.01"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item name="spent_at" label="Spent On" rules={[{ required: true }]}>
          <DatePicker
            style={{ width: '100%' }}
            format="DD-MMM-YY"
            maxDate={DayJS()}
          />
        </Form.Item>
        <Form.Item name="type_id" label="Category" rules={[{ required: true }]}>
          <ExpenseTypeSelect/>
        </Form.Item>
        <Form.Item name="team_id" label="Team" rules={[{ required: true }]}>
          <ExpenseTeamSelect/>
        </Form.Item>
        <Form.Item name="approver_id" label="Approver" rules={[{ required: true }]}>
          <ExpenseApproverSelect/>
        </Form.Item>
        <Form.Item name="details" label="Description" rules={[{ min: 0, max: 250 }]}>
          <TextArea
            rows={4}
            style={{ resize: 'none' }}
          />
        </Form.Item>
        <Typography style={{ marginBottom: 7 }}>Files</Typography>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
            banned files.
          </p>
        </Dragger>
        <SubmitButton
          form={form}
          loading={loading}
          onClick={onClick}
        >
          Save Expense
        </SubmitButton>
      </Form>
    </Drawer>
  );

};

export default ExpenseForm;
