// Components
import AsynchronousSelect from "./AsynchronousSelect";

// Utilities
import { fetchExpenseApprovers } from "../../utilities/request";

type Props = {
  disabled: boolean;
};

const ExpenseApproverSelect: React.FC<Props> = (props) => {

  return (
    <AsynchronousSelect
      {...props}
      placeholder="Select Approver"
      fetchData={fetchExpenseApprovers}
    />
  );

};

export default ExpenseApproverSelect;
