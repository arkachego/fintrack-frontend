// Libraries
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ExpenseListPage from "./pages/ExpenseListPage";
import ExpenseViewPage from "./pages/ExpenseViewPage";
import ExpenseEditPage from "./pages/ExpenseEditPage";

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/expenses" element={<ExpenseListPage />} />
        <Route path="/expense/add-new" element={<ExpenseEditPage />} />
        <Route path="/expense/:id/view" element={<ExpenseViewPage />} />
        <Route path="/expense/:id/edit" element={<ExpenseEditPage />} />
      </Routes>
    </BrowserRouter>
  );

};

export default App;
