import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { CardCustomer } from "../../components/CardCustomer";
import { Pagination } from "../../components/Pagination";
import { ItemsPerPageSelect } from "../../components/ItemsPerPageSelect";
import { Modal } from "../../components/ui/Modal";
import { InputField } from "../../components/ui/Input";
import { useCreateCustomer } from "../../hooks/useCreateCustomer";
import { useCustomers } from "../../context/CustomersContext";
import { useSelectedCustomers } from "../../context/SelectedCustomersContext";
import { useEditCustomer } from "../../hooks/useEditCustomer";
import { useDeleteCustomer } from "../../hooks/useDeleteCustomer";
import { Loader } from "../../components/ui/Loader";

const CustomersList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteName, setDeleteName] = useState<string>("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { customers, isLoading, isError } = useCustomers({ page, limit });
  const { isSelected, toggleSelect } = useSelectedCustomers();
  const { control, isModalOpen, onSubmit, openModal, closeModal } =
    useCreateCustomer();
  const { deleteCustomer } = useDeleteCustomer();

  const {
    control: editControl,
    isModalOpen: isEditOpen,
    onSubmit: onEditSubmit,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useEditCustomer({ userId: editingId });

  const openDeleteModal = (id: number, name: string) => {
    setDeleteName(name);
    setDeleteId(id);
    setIsDeleteOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setDeleteId(null);
    setDeleteName("");
  };
  const handleSelect = (id: number) => {
    const client = customers?.clients.find((c) => c.id === id);
    if (!client) return;
    toggleSelect(client);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <Loader /> <p>Carregando...</p>
      </div>
    );
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
          Clientes encontrados: {customers?.clients.length}
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
              company={user.companyValuation}
              selected={isSelected(user.id)}
              onSelect={handleSelect}
              onEdit={(id) => {
                setEditingId(id);
                openEditModal();
              }}
              onDelete={() => openDeleteModal(user.id, user.name)}
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
        isOpen={isDeleteOpen}
        title="Confirmar exclusão"
        description="Esta ação não pode ser desfeita."
        onSubmit={async () => {
          if (deleteId !== null) {
            await deleteCustomer(deleteId);
          }
        }}
        size="md"
        onClose={closeDeleteModal}
      >
        <div className=" text-gray-700 mb-8">
          Tem certeza que deseja excluir o cliente <strong>{deleteName}</strong>
          ?
        </div>
      </Modal>

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
            rules={{ required: "Nome é obrigatório" }}
          />
          <InputField
            name="salary"
            control={control}
            label="Salário"
            placeholder="Salário"
            currency
            rules={{
              required: "Salário é obrigatório",
            }}
          />

          <InputField
            name="companyValuation"
            control={control}
            label="Empresa"
            placeholder="Valuation da empresa"
            currency
            rules={{
              required: "Valuation da empresa é obrigatório",
            }}
          />
        </div>
      </Modal>

      <Modal
        isOpen={isEditOpen}
        title="Editar Cliente"
        description="Atualize os dados do cliente"
        onSubmit={onEditSubmit}
        size="lg"
        onClose={() => {
          setEditingId(null);
          closeEditModal();
        }}
      >
        <div className="flex flex-col gap-4">
          <InputField
            name="name"
            control={editControl}
            label="Nome"
            placeholder="Nome do cliente"
            rules={{ required: "Nome é obrigatório" }}
          />
          <InputField
            name="salary"
            control={editControl}
            label="Salário"
            placeholder="Salário"
            type="number"
            rules={{
              required: "Salário é obrigatório",
              validate: (v) =>
                !Number.isNaN(Number(v)) || "Salário deve ser um número",
            }}
          />
          <InputField
            name="companyValuation"
            control={editControl}
            label="Empresa"
            type="number"
            rules={{
              required: "Valuation da empresa é obrigatório",
              validate: (v) =>
                !Number.isNaN(Number(v)) ||
                "Valuation da empresa deve ser um número",
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CustomersList;
