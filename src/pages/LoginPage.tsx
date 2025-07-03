// Libraries
import { useEffect, useState } from 'react';
import { Card, Switch } from 'antd';

// Forms
import LoginForm from '../components/form/LoginForm';

// Utilities
import { getTestEmail } from '../utilities/test-email';

type HeaderProps = {
  checked: boolean;
  setChecked: (checked: boolean) => void;
};

const LoginHeader: React.FC<HeaderProps> = ({ checked, setChecked }) => {

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        FinTrack: Sign-In
      </div>
      {import.meta.env.ENVIRONMENT !== 'production' && (
        <Switch
        checkedChildren="Admin"
          unCheckedChildren="Employee"
          checked={checked}
          onChange={setChecked}
        />
      )}
    </div>
  );

};

const LoginPage: React.FC = () => {

  const [ checked, setChecked ] = useState<boolean>(false);
  const [ testEmail, setTestEmail ] = useState<string>('');

  useEffect(() => {
    const email = getTestEmail(checked ? 'admin' : 'employee');
    setTestEmail(email);
  }, [ checked ]);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: "center", justifyContent: "center" }}>
      <Card title={<LoginHeader checked={checked} setChecked={setChecked} />} style={{ width: 360 }}>
        <LoginForm testEmail={testEmail}/>
      </Card>
    </div>
  );

};

export default LoginPage;
