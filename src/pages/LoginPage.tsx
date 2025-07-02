// Libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Input, Space } from 'antd';
import { KeyOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';

// Actions
import { loadState } from "../slices/globalSlice";

// Hooks
import { useAppDispatch } from "../hooks/useRedux";

// Utilities
import { fetchProfile, loginUser } from "../utilities/request";

const LoginPage: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ email, setEmail ] = useState<string>('liam.bennett@arkahalder.com');
  const [ password, setPassword ] = useState<string>('SamplePassword1234#');

  const handleLogin = async () => {
    try {
      setLoading(true);
      await loginUser(email, password);
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
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: "center", justifyContent: "center" }}>
      <Card title="FinTrack: Sign-In" loading={loading} style={{ width: 360 }}>
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <Input
            disabled={loading}
            placeholder="Email Address"
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <Input.Password
            disabled={loading}
            placeholder="Login Password"
            prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <Button type="primary" block loading={loading} disabled={loading} onClick={handleLogin}>
            <LoginOutlined/>
            Sign-In
          </Button>
        </Space>
      </Card>
    </div>
  );

};

export default LoginPage;
