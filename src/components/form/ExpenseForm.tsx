// Libraries
import DayJS from "dayjs";
import { useEffect, useState } from 'react';
import { PictureOutlined } from '@ant-design/icons';
import {
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Upload,
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
import { createExpense, getUploadUrl } from "../../utilities/request";
import type { RcFile } from "antd/es/upload";

const { TextArea } = Input;
const { Dragger } = Upload;

const ExpenseForm: React.FC = () => {

  const [ form ] = Form.useForm();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.expense.active.loading);
  const expense = useAppSelector(state => state.expense.active.value);
  const [ image, setImage ] = useState<File | null>(null);
  const [ base64, setBase64 ] = useState<string>('');

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
      if (image) {
        const { data } = await getUploadUrl({
          name: image.name,
          type: image.type,
        });
        const response = await fetch(data.url, {
          method: "PUT",
          body: image,
          headers: {
            "Content-Type": image.type,
          },
        });
        if (!response.ok) {
          throw new Error("Upload failed");
        }
        payload.attachment = data.name;
      }
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

  const onChange: (info: any) => void = (info) => {
    const file = info.fileList[0].originFileObj;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64(reader.result as string);
    };
    reader.onerror = (error) => {
      throw error;
    };
    setImage(file);
  };

  return (
    <Drawer
      closable
      destroyOnHidden
      title={expense?.id ? expense?.name : 'Add new Expense'}
      onClose={() => dispatch(closeExpenseModal())}
      open={expense !== null}
    >
      <div style={{ width: '100%', aspectRatio: 1, marginBottom: 16 }}>
        {image ? (
          <img
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10 }}
            src={base64}
          />
        ) : (
          <Dragger name="file" onChange={onChange} action={(_: RcFile) => ''} showUploadList={false}>
            <PictureOutlined style={{ fontSize: 150 }}/>
            <p className="ant-upload-text">
              Upload the Supporting Document
            </p>
            <p className="ant-upload-hint">
              Only JPG, JPEG and PNG files are allowed.
              <br/>
              Size of the file cannot be of more than 2 MB.
              <br/>
              Only one file can be linked with your expense.
            </p>
          </Dragger>
        )}
      </div>
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
        <Form.Item style={{ marginBottom: 0 }} name="details" label="Description" rules={[{ min: 0, max: 250 }]}>
          <TextArea
            rows={4}
            style={{ resize: 'none' }}
          />
        </Form.Item>
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
