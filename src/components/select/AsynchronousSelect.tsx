// Libraries
import { useEffect, useState } from "react";
import type { AxiosResponse } from "axios";
import { Select } from 'antd';

// Types
import type { SelectOptionType } from "../../types/SelectOptionType";

type Props = {
  disabled: boolean;
  placeholder: string;
  fetchData: () => Promise<AxiosResponse<any, any>>;
};

const AsynchronousSelect: React.FC<Props> = ({ disabled, placeholder, fetchData }) => {

  const [ options, setOptions ] = useState<SelectOptionType[]>([]);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const { data: newOptions } = await fetchData();
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
      showSearch
      allowClear
      style={{ width: '100%' }}
      disabled={disabled}
      placeholder={placeholder}
      optionFilterProp="label"
      filterSort={(optionA: SelectOptionType, optionB: SelectOptionType) =>
        (optionA.label ?? '').toLowerCase().localeCompare((optionB.label ?? '').toLowerCase())
      }
      options={options}
    />
  );

};

export default AsynchronousSelect;
