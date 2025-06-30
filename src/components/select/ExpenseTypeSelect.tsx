// Components
import AsynchronousSelect from "./AsynchronousSelect";

// Utilities
import { fetchExpenseTypes } from "../../utilities/request";

type Props = {
  disabled: boolean;
};

const ExpenseTypeSelect: React.FC<Props> = (props) => {

  return (
    <AsynchronousSelect
      {...props}
      placeholder="Select Type"
      fetchData={fetchExpenseTypes}
    />
  );

};

export default ExpenseTypeSelect;
