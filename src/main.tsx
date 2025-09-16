import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomersProvider } from "./context/CustomersContext";
import { SelectedCustomersProvider } from "./context/SelectedCustomersContext";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CustomersProvider>
          <SelectedCustomersProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SelectedCustomersProvider>
        </CustomersProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
