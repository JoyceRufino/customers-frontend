import { CardCustomer } from "../../components/CardCustomer";
import { Button } from "../../components/ui/Button";
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
        <h1 className="text-xl font-bold">Clientes Selecionados:</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {selected.map((user) => (
          <CardCustomer
            key={user.id}
            id={user.id}
            name={user.name}
            salary={user.salary}
            company={user.companyValuation}
            selected={isSelected(user.id)}
            onSelect={() => toggleSelect(user)}
            showActions={false}
          />
        ))}
      </div>
      <div className="w-full mt-6">
        <Button onClick={clear} className="w-full" variant="outline">
          Limpar seleção
        </Button>
      </div>
    </div>
  );
};

export default SelectedCustomers;
