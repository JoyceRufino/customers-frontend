import React from "react";
import { Pencil, Plus, Trash } from "lucide-react";

interface CardCustomerProps {
  id: number;
  name: string;
  salary: number;
  company: string;
  onSelect?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export const CardCustomer: React.FC<CardCustomerProps> = ({
  id,
  name,
  salary,
  company,
  onSelect,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition flex flex-col justify-between bg-white">
      <div className="mb-4">
        <h2 className="font-bold text-lg mb-2">{name}</h2>
        <p>
          <strong>Salário:</strong> ${salary}
        </p>
        <p>
          <strong>Empresa:</strong> {company}
        </p>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => onSelect?.(id)}
          className="text-primary"
          title="Selecionar"
        >
          <Plus size={20} />
        </button>
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
      </div>
    </div>
  );
};
