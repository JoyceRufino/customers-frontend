import api from "..";
import type { Client } from "../types/customers";

/**Create customers */
export const createClient = async (client: Client) => {
  const { data } = await api.post("/users", client);
  return data;
};

/**Get users */
export const getUsers = async (page: number = 1, limit: number = 10) => {
  const { data } = await api.get("/users", {
    params: { page, limit },
  });
  return data;
};

/**User id */
export const getUserById = async (id: string) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};
