// Libraries
import { Select, type SelectProps } from "antd";

// Types
import type { SelectOptionType } from "../../types/SelectOptionType";
import { useAppSelector } from "../../hooks/useRedux";

const ExpenseApproverSelect: React.FC<SelectProps> = (props) => {

  const options = useAppSelector(state => state.global.options.approvers);

  return (
    <Select
      {...props}
      showSearch
      style={{ width: '100%' }}
      placeholder="Select Approver"
      optionFilterProp="label"
      filterSort={(optionA: SelectOptionType, optionB: SelectOptionType) =>
        (optionA.label ?? '').toLowerCase().localeCompare((optionB.label ?? '').toLowerCase())
      }
      options={options}
    />
  );

};

export default ExpenseApproverSelect;
