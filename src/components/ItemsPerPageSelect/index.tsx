import React from "react";

interface ItemsPerPageSelectProps {
  value: number;
  onChange: (value: number) => void;
  options?: number[];
  label?: string;
}

export const ItemsPerPageSelect: React.FC<ItemsPerPageSelectProps> = ({
  value,
  onChange,
  options = [4, 8, 12],
  label = "Clientes por página:",
}) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="items-per-page" className="font-medium">
        {label}
      </label>
      <select
        id="items-per-page"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="border rounded px-2 py-1"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};
