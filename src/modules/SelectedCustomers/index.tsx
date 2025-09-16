import { CardCustomer } from "../../components/CardCustomer";
import { useSelectedCustomers } from "../../context/SelectedCustomersContext";

const SelectedCustomers = () => {
  const { selected, toggleSelect, isSelected, clear } = useSelectedCustomers();

  if (selected.length === 0) {
    return (
      <div className="p-4 text-gray-600">Nenhum cliente selecionado ainda.</div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Clientes Selecionados</h1>
        <button
          onClick={clear}
          className="px-3 py-1 border rounded text-red-600 hover:bg-red-50"
        >
          Limpar seleção
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {selected.map((user) => (
          <CardCustomer
            key={user.id}
            id={user.id}
            name={user.name}
            salary={user.salary}
            company={user.companyValuation.toString()}
            selected={isSelected(user.id)}
            onSelect={() => toggleSelect(user)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectedCustomers;
