import { Controller } from "react-hook-form";
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { formatCurrencyBRL } from "../../../utils/formatCurrency";

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  rules?: RegisterOptions<T, Path<T>>;
  currency?: boolean;
}

export const InputField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  className = "",
  rules,
  currency = false,
}: InputFieldProps<T>) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="font-medium">{label}</label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => {
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (currency) {
              const raw = e.target.value.replace(/\D/g, "");
              field.onChange(Number(raw) / 100);
            } else {
              field.onChange(e.target.value);
            }
          };

          const displayValue = currency
            ? formatCurrencyBRL((field.value ?? 0) * 100)
            : field.value ?? "";

          return (
            <>
              <input
                {...field}
                value={displayValue}
                onChange={handleChange}
                type={type}
                placeholder={placeholder}
                className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className} ${
                  fieldState.error ? "border-red-500" : "border-gray-300"
                }`}
              />
              {fieldState.error && (
                <span className="text-red-500 text-sm">
                  {fieldState.error.message}
                </span>
              )}
            </>
          );
        }}
      />
    </div>
  );
};
