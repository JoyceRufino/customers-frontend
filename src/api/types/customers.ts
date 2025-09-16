export type Client = {
  name: string;
  salary: number;
  companyValuation: number;
};

export type ClientID = {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt: string;
  updatedAt: string;
};

export interface GetUsersResponse {
  clients: ClientID[];
  totalPages: number;
  currentPage: number;
}
