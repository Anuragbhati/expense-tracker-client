import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Expenses from "../pages/Expenses";
import Categories from "../pages/Categories";
import Auth from "../pages/Auth";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/categories" element={<Categories />} />
    </Routes>
  );
};

export default AppRoutes;
