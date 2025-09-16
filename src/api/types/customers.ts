export type Client = {
  name: string;
  salary: number;
  companyValuation: number;
};

// Interface do usuário (pode ser diferente do create)
export type User = {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
};

// Tipagem para um único cliente
export type ClientID = {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt: string;
  updatedAt: string;
};

// Tipagem para a resposta completa da API
export interface GetUsersResponse {
  clients: ClientID[];
  totalPages: number;
  currentPage: number;
}
