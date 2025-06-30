// Libraries
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { Provider as StoreProvider } from 'react-redux';

// Components
import App from './App.tsx';
import { store } from "./store";

// Styles
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider componentSize='large'>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </ConfigProvider>
  </StrictMode>,
);
