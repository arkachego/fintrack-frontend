// Libraries
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import LoginPage from "./pages/LoginPage";
import LayoutPage from './pages/LayoutPage';
import ExpensesPage from './pages/ExpensesPage';
import AnalyticsPage from "./pages/AnalyticsPage";

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<LayoutPage />}>
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

};

export default App;
