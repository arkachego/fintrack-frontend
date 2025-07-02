// Libraries
import { Select, type SelectProps } from "antd";

// Types
import type { SelectOptionType } from "../../types/SelectOptionType";

// Hooks
import { useAppSelector } from "../../hooks/useRedux";

const ExpenseTeamSelect: React.FC<SelectProps> = (props) => {

  const options = useAppSelector(state => state.global.options.teams);

  return (
    <Select
      {...props}
      showSearch
      style={{ width: '100%' }}
      placeholder="Select Team"
      optionFilterProp="label"
      filterSort={(optionA: SelectOptionType, optionB: SelectOptionType) =>
        (optionA.label ?? '').toLowerCase().localeCompare((optionB.label ?? '').toLowerCase())
      }
      options={options}
    />
  );

};

export default ExpenseTeamSelect;
