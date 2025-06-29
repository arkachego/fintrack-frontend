// Libraries
import { useState } from "react";

// Components
import ExpenseApproverSelect from "../components/select/ExpenseApproverSelect";
import ExpenseStatusSelect from "../components/select/ExpenseStatusSelect";
import ExpenseTypeSelect from "../components/select/ExpenseTypeSelect";
import ExpenseTeamSelect from "../components/select/ExpenseTeamSelect";
import ExpenseRequestorSelect from "../components/select/ExpenseRequestorSelect";

const LoginPage: React.FC = () => {

  const [ loading, setLoading ] = useState<boolean>(false);
  const [ disabled, setDisabled ] = useState<boolean>(false);

  return (
    <div>
      <ExpenseTeamSelect loading={loading} disabled={disabled}/>
      <ExpenseApproverSelect loading={loading} disabled={disabled}/>
      <ExpenseRequestorSelect loading={loading} disabled={disabled}/>
      <ExpenseTypeSelect loading={loading} disabled={disabled}/>
      <ExpenseStatusSelect loading={loading} disabled={disabled}/>
    </div>
  );

};

export default LoginPage;
