// Libraries
import { Card } from 'antd';

// Forms
import LoginForm from '../components/form/LoginForm';

const LoginPage: React.FC = () => {

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: "center", justifyContent: "center" }}>
      <Card title="FinTrack: Sign-In" style={{ width: 360 }}>
        <LoginForm/>
      </Card>
    </div>
  );

};

export default LoginPage;
