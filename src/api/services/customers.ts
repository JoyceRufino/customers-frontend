import api from "..";
import type { Client } from "../types/customers";

/**Create customers */
export const createClient = async (client: Client) => {
  const { data } = await api.post("/users", client);
  return data;
};

/**Get users */
export const getCustomers = async (page: number = 1, limit: number = 10) => {
  const { data } = await api.get("/users", {
    params: { page, limit },
  });
  return data;
};

/**User id */
export const getCustomerById = async (id: string) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

/**Delete user */
export const deleteCustomer = async (id: string) => {
  const { data } = await api.delete(`/users/${id}`);
  return data;
};

/**Edit user */
export const editCustomer = async (id: string, user: Client) => {
  const { data } = await api.patch(`/users/${id}`, user);
  return data;
};
