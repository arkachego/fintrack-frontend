// Libraries
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Input } from 'antd';
import { KeyOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';

// Components
import SubmitButton from '../button/SubmitButton';

// Hooks
import { useAppDispatch } from '../../hooks/useRedux';

// Actions
import { loadState } from "../../slices/globalSlice";

// Utilities
import { fetchProfile, loginUser } from "../../utilities/request";

type Props = {
  testEmail: string;
};

const LoginForm: React.FC<Props> = ({ testEmail }) => {

  const [ form ] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [ loading, setLoading ] = useState<boolean>(false);

  console.log(import.meta.env.VITE_ENVIRONMENT);

  useEffect(() => {
    if (testEmail) {
      const environment = import.meta.env.VITE_ENVIRONMENT;
      console.log(environment);
      if (environment === 'development') {
        form.setFieldValue('email', testEmail);
        form.setFieldValue('password', [ 'Sample', 'Password', '1234', '#' ].join(''));
      }
    }
  }, [ testEmail ]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const payload = form.getFieldsValue();
      await loginUser(payload.email, payload.password);
      setTimeout(async () => {
        const response = await fetchProfile();
        dispatch(loadState(response.data));
        navigate('/expenses');
      }, 500);
    }
    catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      name="expense-form"
      layout="vertical"
      variant='filled'
      autoComplete="off"
      disabled={loading}
      validateTrigger={['onBlur']}
    >
      <Form.Item name="email" label="Email Address" rules={[{ required: true, max: 100 }]}>
        <Input
          disabled={loading}
          placeholder="Max 100 characters"
          prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }} name="password" label="Login Password" rules={[{ required: true, min: 8, max: 25 }]}>
        <Input.Password
          disabled={loading}
          placeholder="8-25 characters"
          prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
      </Form.Item>
      <SubmitButton
        form={form}
        loading={loading}
        onClick={handleLogin}
      >
        <LoginOutlined/>
        Sign-In
      </SubmitButton>
    </Form>
  );

};

export default LoginForm;
