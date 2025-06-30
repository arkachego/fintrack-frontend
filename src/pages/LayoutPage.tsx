// Libraries
import { useEffect } from 'react';
import { Button, Layout, Menu, Typography } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';

// Actions
import {
  resetState as resetGlobalState,
  activatePage,
} from '../slices/globalSlice';
import {
  resetState as resetSearchState,
} from '../slices/searchSlice';
import {
  resetState as resetExpenseState,
} from '../slices/expenseSlice';

// Hooks
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';

// Utilities
import { logoutUser } from '../utilities/request';

const { Header, Content } = Layout;

const LayoutPage: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.global.user);
  const active = useAppSelector(state => state.global.active);
  const menu = useAppSelector(state => state.global.menu);

  useEffect(() => {
    if (!user) {
      navigate('/', { replace: true });
    }
  }, [ user ]);

  const onPageChange = (key: string) => {
    dispatch(activatePage(key));
    const item = (menu || []).find(i => i.key === key);
    navigate(item.url);
  };

  const handleLogout = async () => {
      try {
        await logoutUser();
        dispatch(resetExpenseState());
        dispatch(resetSearchState());
        dispatch(resetGlobalState());
        navigate('/login');
      }
      catch (error) {
        console.error(error);
      }
    };

  return (
    <Layout style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography.Title type='secondary' level={3} style={{ color: '#FFFFFF', margin: 0, padding: '0px 24px' }}>FinTrack</Typography.Title>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[ active || '' ]}
            items={menu}
            style={{ flex: 1, minWidth: 0 }}
            onClick={event => onPageChange(event.key)}
          />
        </div>
        <Button danger style={{ marginRight: 24 }} onClick={handleLogout}>
          <LogoutOutlined/>
          Sign-Out
        </Button>
      </Header>
      <Content style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <Outlet />
      </Content>
    </Layout>
  );

};

export default LayoutPage;
