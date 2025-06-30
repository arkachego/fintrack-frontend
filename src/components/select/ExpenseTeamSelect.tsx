// Components
import AsynchronousSelect from "./AsynchronousSelect";

// Utilities
import { fetchExpenseTeams } from "../../utilities/request";

type Props = {
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
