// src/modules/CustomersList/index.tsx
import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { CardCustomer } from "../../components/CardCustomer";
import { Pagination } from "../../components/Pagination";
import { ItemsPerPageSelect } from "../../components/ItemsPerPageSelect";
import { Modal } from "../../components/ui/Modal";
import { InputField } from "../../components/ui/Input";
import { useCreateCustomer } from "../../hooks/useCreateCustomer";
import { useCustomers } from "../../context/CustomersContext";
import { type ClientID } from "../../api/types/customers";

interface CustomersResponse {
  clients: ClientID[];
  totalPages: number;
  currentPage: number;
}

const CustomersList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const { customers, isLoading, isError } = useCustomers({ page, limit });

  console.log("customers: ", customers);

  const { control, isModalOpen, onSubmit, openModal, closeModal } =
    useCreateCustomer();

  const totalClients = customers?.clients.length || 0;

  if (isLoading) {
    return <p className="p-4">Carregando clientes...</p>;
  }

  if (isError) {
    return (
      <p className="p-4 text-red-500">
        Ocorreu um erro ao carregar os clientes.
      </p>
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-xl font-bold">
          Clientes encontrados (página {page}):
        </h1>
        <ItemsPerPageSelect
          value={limit}
          onChange={(value) => {
            setLimit(value);
            setPage(1);
          }}
        />
      </div>

      {customers?.clients.length === 0 ? (
        <p className="text-gray-500">Nenhum cliente cadastrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {customers?.clients.map((user) => (
            <CardCustomer
              key={user.id}
              id={user.id}
              name={user.name}
              salary={user.salary}
              company={user.companyValuation.toString()}
              onSelect={(id) => console.log("Selecionado:", id)}
              onEdit={(id) => console.log("Editar:", id)}
              onDelete={(id) => console.log("Excluir:", id)}
            />
          ))}
        </div>
      )}

      <div className="w-full mb-5">
        <Button onClick={openModal} variant="outline" className="w-full">
          Criar Cliente
        </Button>
      </div>

      <Pagination
        currentPage={page}
        totalPages={customers?.totalPages || 0}
        onPageChange={(newPage) => setPage(newPage)}
      />

      <Modal
        isOpen={isModalOpen}
        title="Criar Cliente"
        description="Preencha os dados do cliente"
        onSubmit={onSubmit}
        size="lg"
        onClose={closeModal}
      >
        <div className="flex flex-col gap-4">
          <InputField
            name="name"
            control={control}
            label="Nome"
            placeholder="Nome do cliente"
          />
          <InputField
            name="salary"
            control={control}
            label="Salário"
            placeholder="Salário"
            type="number"
          />
          <InputField
            name="companyValuation"
            control={control}
            label="Empresa"
            type="number"
          />
        </div>
      </Modal>
    </div>
  );
};

export default CustomersList;
