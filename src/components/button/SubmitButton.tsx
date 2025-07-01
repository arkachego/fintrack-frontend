// Libraries
import { useEffect, useState } from 'react';
import { Button, Form, type FormInstance } from 'antd';

interface SubmitButtonProps {
  form: FormInstance;
  loading: boolean;
  onClick: () => Promise<void>,
};

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, loading, onClick, children }) => {
  
  const [ submittable, setSubmittable ] = useState<boolean>(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button
      block
      type="primary"
      htmlType="submit"
      style={{ marginTop: 24 }}
      disabled={!submittable || loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
