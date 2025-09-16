import { Check, Pencil, Plus, Trash } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

interface CardCustomerProps {
  id: number;
  name: string;
  salary: number;
  company: number;
  onSelect?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  selected?: boolean;
  showActions?: boolean; // 👈 nova prop
}

export const CardCustomer: React.FC<CardCustomerProps> = ({
  id,
  name,
  salary,
  company,
  onSelect,
  onEdit,
  onDelete,
  selected = false,
  showActions = true,
}) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition flex flex-col justify-between bg-white">
      <div className="mb-4">
        <h2 className="font-bold text-lg mb-2">{name}</h2>
        <p>
          <strong>Salário:</strong> {formatCurrency(salary)}
        </p>
        <p>
          <strong>Empresa:</strong> {formatCurrency(company)}
        </p>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => onSelect?.(id)}
          className={selected ? "text-green-600" : "text-primary"}
          title={selected ? "Selecionado" : "Selecionar"}
        >
          {selected ? <Check size={20} /> : <Plus size={20} />}
        </button>

        {showActions && (
          <>
            <button
              onClick={() => onEdit?.(id)}
              className="text-blue-500 hover:text-blue-700"
              title="Editar"
            >
              <Pencil size={20} />
            </button>
            <button
              onClick={() => onDelete?.(id)}
              className="text-red-500 hover:text-red-700"
              title="Excluir"
            >
              <Trash size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
