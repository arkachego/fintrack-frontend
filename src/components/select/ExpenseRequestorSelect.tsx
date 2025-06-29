// Components
import AsynchronousSelect from "./AsynchronousSelect";

// Utilities
import { fetchExpenseRequestors } from "../../utilities/request";

type Props = {
  loading: boolean;
  disabled: boolean;
};

const ExpenseRequestorSelect: React.FC<Props> = (props) => {

  return (
    <AsynchronousSelect
      {...props}
      placeholder="Select Requestor"
      fetchData={fetchExpenseRequestors}
    />
  );

};

export default ExpenseRequestorSelect;
