// Components
import AsynchronousSelect from "./AsynchronousSelect";

// Utilities
import { fetchExpenseTeams } from "../../utilities/request";

type Props = {
  loading: boolean;
  disabled: boolean;
};

const ExpenseTeamSelect: React.FC<Props> = (props) => {

  return (
    <AsynchronousSelect
      {...props}
      placeholder="Select Team"
      fetchData={fetchExpenseTeams}
    />
  );

};

export default ExpenseTeamSelect;
