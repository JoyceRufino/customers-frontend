import { Controller } from "react-hook-form";
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  rules?: RegisterOptions;
}

export const InputField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  className = "",
  rules,
}: InputFieldProps<T>) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="font-medium">{label}</label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <input
              {...field}
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
        )}
      />
    </div>
  );
};
