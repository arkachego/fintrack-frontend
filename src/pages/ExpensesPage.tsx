// Libraries
import { useEffect, useState } from "react";
import { Button, Input, Row, Pagination } from "antd";
import { FilterFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons';

// Actions
import {
  toggleSearchModal,
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

// Hooks
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";

// Utilities
import { fetchExpenseCount, fetchExpenseResult } from "../utilities/request";

const ExpensesPage: React.FC = () => {

  const dispatch = useAppDispatch();
  const search = useAppSelector(state => state.search.value);
  const loading = useAppSelector(state => state.expense.list.loading);
  const count = useAppSelector(state => state.expense.list.count);
  const expenses = useAppSelector(state => state.expense.list.value);
  const [ launched, setLaunched ] = useState<boolean>(false);
  const [ searchString, setSearchString ] = useState<string>('');

  const {
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

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ height: 88, padding: 24, borderBottom: 'thin solid #DEDEDE', display: 'flex', justifyContent: 'space-between' }}>
        <Button
          icon={<FilterFilled/>}
          onClick={() => dispatch(toggleSearchModal())}
        />
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
            <ExpenseCard key={expense.id} expense={expense}/>
          ))}
        </Row>
      </div>
      <ExpenseFilter/>
      <ExpenseForm/>
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
