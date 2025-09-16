import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../api/services/customers";
import type { GetUsersResponse } from "../api/types/customers";

export const CustomersProvider = ({ children }: { children: ReactNode }) => {
  return children;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCustomers = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const { data, isLoading, isError, refetch } = useQuery<GetUsersResponse>({
    queryKey: ["customers", page, limit],
    queryFn: () => getCustomers(page, limit),
    placeholderData: (prev) => prev,
  });

  return {
    customers: data,
    isLoading,
    isError,
    refetch,
  };
};
