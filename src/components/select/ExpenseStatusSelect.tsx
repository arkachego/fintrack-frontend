// Components
import AsynchronousSelect from "./AsynchronousSelect";

// Utilities
import { fetchExpenseStatuses } from "../../utilities/request";

type Props = {
  disabled: boolean;
};

const ExpenseStatusSelect: React.FC<Props> = (props) => {

  return (
    <AsynchronousSelect
      {...props}
      placeholder="Select Status"
      fetchData={fetchExpenseStatuses}
    />
  );

};

export default ExpenseStatusSelect;
