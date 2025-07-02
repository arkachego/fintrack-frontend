// Libraries
import { Select, type SelectProps } from "antd";

// Hooks
import { useAppSelector } from "../../hooks/useRedux";

// Types
import type { SelectOptionType } from "../../types/SelectOptionType";

const ExpenseRequestorSelect: React.FC<SelectProps> = (props) => {

  const options = useAppSelector(state => state.global.options.requestors);

  return (
    <Select
      {...props}
      showSearch
      style={{ width: '100%' }}
      placeholder="Select Requestor"
      optionFilterProp="label"
      filterSort={(optionA: SelectOptionType, optionB: SelectOptionType) =>
        (optionA.label ?? '').toLowerCase().localeCompare((optionB.label ?? '').toLowerCase())
      }
      options={options}
    />
  );

};

export default ExpenseRequestorSelect;
