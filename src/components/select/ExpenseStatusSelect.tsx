// Libraries
import { Select, type SelectProps } from "antd";

// Types
import type { SelectOptionType } from "../../types/SelectOptionType";

// Hooks
import { useAppSelector } from "../../hooks/useRedux";

const ExpenseStatusSelect: React.FC<SelectProps> = (props) => {

  const options = useAppSelector(state => state.global.options.statuses);

  return (
    <Select
      {...props}
      showSearch
      style={{ width: '100%' }}
      placeholder="Select Status"
      optionFilterProp="label"
      filterSort={(optionA: SelectOptionType, optionB: SelectOptionType) =>
        (optionA.label ?? '').toLowerCase().localeCompare((optionB.label ?? '').toLowerCase())
      }
      options={options}
    />
  );

};

export default ExpenseStatusSelect;
