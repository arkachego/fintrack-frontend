// Libraries
import { useEffect, useState } from "react";
import { Select, type SelectProps } from "antd";

// Utilities
import { fetchExpenseRequestors } from "../../utilities/request";

// Types
import type { SelectOptionType } from "../../types/SelectOptionType";

const ExpenseRequestorSelect: React.FC<SelectProps> = (props) => {

  const [ options, setOptions ] = useState<SelectOptionType[]>([]);
  
  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const { data: newOptions } = await fetchExpenseRequestors();
      setOptions(newOptions.map((newOption: any) => ({
        label: newOption.name,
        value: newOption.id,
      })));
    }
    catch (error) {
      console.error(error);
    }
  };

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
