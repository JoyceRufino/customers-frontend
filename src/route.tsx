import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import CustomersList from "./modules/CustomersList";
import SelectedCustomers from "./modules/SelectedCustomers";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="customers" element={<CustomersList />} />
        <Route path="customers-selected" element={<SelectedCustomers />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
