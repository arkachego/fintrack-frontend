// Libraries
import { useEffect, useState } from "react";
import { Button, Input, Row, Switch, Pagination } from "antd";
import { FilterFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons';

// Actions
import {
  toggleSearchModal,
  toggleShowQueue,
  updateKeyword,
  updatePageValue,
  updateItemValue,
} from "../slices/searchSlice";
import {
  setListLoading,
  setListCount,
  updateExpenseList,
  openExpenseModal,
} from "../slices/expenseSlice";

// Components
import ExpenseCard from "../components/card/ExpenseCard";
import ExpenseFilter from "../components/form/ExpenseFilter";
import ExpenseForm from "../components/form/ExpenseForm";
import ApproveModal from "../components/modal/ApproveModal";

// Hooks
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";

// Utilities
import { fetchExpenseCount, fetchExpenseResult, updateStatus } from "../utilities/request";

// Types
import type { ExpenseType } from "../types/ExpenseType";

const ExpensesPage: React.FC = () => {

  const dispatch = useAppDispatch();
  const statuses = useAppSelector(state => state.global.options.statuses);
  const search = useAppSelector(state => state.search.value);
  const loading = useAppSelector(state => state.expense.list.loading);
  const count = useAppSelector(state => state.expense.list.count);
  const expenses = useAppSelector(state => state.expense.list.value);
  const [ launched, setLaunched ] = useState<boolean>(false);
  const [ searchString, setSearchString ] = useState<string>('');
  const [ selected, setSelected ] = useState<ExpenseType | null>(null);

  const {
    show_queue,
    keyword,
    type_id,
    status_id,
    team_id,
    approver_id,
    requestor_id,
    requested_at,
    page_value,
    item_value,
  } = search;

  useEffect(() => {
    launchModule();
  }, []);

  useEffect(() => {
    if (launched) {
      loadFirstPage();
    }
  }, [ keyword, type_id, status_id, team_id, approver_id, requestor_id, requested_at, item_value ]);
  
  useEffect(() => {
    if (launched) {
      loadOtherPage();
    }
  }, [ page_value ]);

  const launchModule = async () => {
    await loadFirstPage();
    setLaunched(true);
  };

  const loadFirstPage = async () => {
    try {
      dispatch(setListLoading(true));
      const { data: countResult } = await fetchExpenseCount(search);
      dispatch(setListCount(parseInt(countResult.count)));
      const { data: searchResult } = await fetchExpenseResult(search);
      dispatch(updateExpenseList(searchResult));
    }
    catch (error) {
      console.error(error);
    }
    finally {
      dispatch(setListLoading(false));
    }
  };

  const loadOtherPage = async () => {
    try {
      dispatch(setListLoading(true));
      const { data: searchResult } = await fetchExpenseResult(search);
      dispatch(updateExpenseList(searchResult));
    }
    catch (error) {
      console.error(error);
    }
    finally {
      dispatch(setListLoading(false));
    }
  };

  const onSearchEnter = (event: any) => {
    if (event.key === 'Enter') {
      dispatch(updateKeyword(searchString));
    }
  };

  const onStatusSubmit = async (status: string) => {
    const chosenStatus = statuses.find(s => s.label === status);
    if (chosenStatus) {
      await updateStatus({
        id: selected?.id || '',
        status_id: chosenStatus.value,
      });
      await loadOtherPage();
    }
    setSelected(null);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ height: 88, padding: 24, borderBottom: 'thin solid #DEDEDE', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            icon={<FilterFilled/>}
            onClick={() => dispatch(toggleSearchModal())}
          />
          <Switch
            checked={show_queue}
            onChange={(_: boolean) => toggleShowQueue()}
          />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Input
            allowClear
            placeholder="Search Expenses..."
            suffix={<SearchOutlined/>}
            style={{ width: 320 }}
            value={searchString}
            onChange={event => setSearchString(event.target.value)}
            onKeyDown={onSearchEnter}
            disabled={loading}
          />
          <Button
            type="primary"
            onClick={() => dispatch(openExpenseModal())}
            disabled={loading}
          >
            <PlusOutlined/>
            Add New
          </Button>
        </div>
      </div>
      <div style={{ width: '100%', height: window.innerHeight - 232, overflow: 'hidden auto' }}>
        <Row gutter={[24, 24]} style={{ padding: 24 }}>
          {expenses.map(expense => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onClick={() => setSelected(expense)}
            />
          ))}
        </Row>
      </div>
      <ExpenseFilter/>
      <ExpenseForm/>
      <ApproveModal
        open={!!selected}
        onCancel={() => setSelected(null)}
        onSubmit={onStatusSubmit}
      />
      <div style={{ height: 80, padding: 24, borderTop: 'thin solid #DEDEDE', display: 'flex', justifyContent: 'center' }}>
        <Pagination
          total={count}
          disabled={loading}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          defaultPageSize={20}
          defaultCurrent={1}
          current={search.page_value}
          pageSize={search.item_value}
          pageSizeOptions={[ 20, 50, 100 ]}
          onChange={(page: number) => dispatch(updatePageValue(page))}
          onShowSizeChange={(_: number, item: number) => dispatch(updateItemValue(item))}
        />
      </div>
    </div>
  );

};

export default ExpensesPage;
