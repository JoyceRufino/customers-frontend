import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import CustomersList from "./modules/CustomersList";
import SelectedCustomers from "./modules/SelectedCustomers";
import Login from "./modules/Login";
import { useAuth } from "./context/AuthContext";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={isAuthenticated ? <Layout /> : <Navigate to="/login" replace />}
      >
        <Route path="customers" element={<CustomersList />} />
        <Route path="customers-selected" element={<SelectedCustomers />} />
        <Route index element={<Navigate to="/customers" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
