// src/context/CustomersContext.tsx
import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/services/customers";
import type { ClientID } from "../api/types/customers";

// Interface para a resposta completa da API
interface CustomersResponse {
  clients: ClientID[];
  totalPages: number;
  currentPage: number;
}

interface CustomersContextType {
  customers: CustomersResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

const CustomersContext = createContext<CustomersContextType | undefined>(
  undefined
);

export const CustomersProvider = ({
  children,
  page,
  limit,
}: {
  children: ReactNode;
  page: number;
  limit: number;
}) => {
  const { data, isLoading, isError, refetch } = useQuery<CustomersResponse>({
    queryKey: ["customers", page, limit],
    queryFn: () => getUsers({ page, limit }),
  });

  const value = {
    customers: data,
    isLoading,
    isError,
    refetch,
  };

  return (
    <CustomersContext.Provider value={value}>
      {children}
    </CustomersContext.Provider>
  );
};

export const useCustomers = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const context = useContext(CustomersContext);
  if (context === undefined) {
    throw new Error("useCustomers must be used within a CustomersProvider");
  }
  return context;
};
