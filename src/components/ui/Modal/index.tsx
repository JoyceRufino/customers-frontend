import React, { type ReactNode, useState } from "react";
import { X } from "lucide-react";
import { Button } from "../Button";

type ModalSize = "sm" | "md" | "lg" | "xl";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  onSubmit: () => Promise<void>;
  submitText?: string;
  closeText?: string;
  size?: ModalSize;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  onSubmit,
  submitText = "Salvar",
  closeText = "Fechar",
  size = "md",
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit();
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className={`bg-white rounded-lg shadow-lg w-full ${sizeClasses[size]} p-6 relative`}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="mb-4 border-b gap-2">
          <h2 className="text-xl font-bold">{title}</h2>
          {description && <p className="text-gray-500 pb-3">{description}</p>}
        </div>

        <div className="mb-4">{children}</div>

        <div className="flex justify-end gap-2">
          <Button
            className="bg-gray-600 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 text-white"
            onClick={onClose}
            disabled={loading}
            variant="secondary"
          >
            {closeText}
          </Button>
          <Button
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary disabled:opacity-50"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Salvando..." : submitText}
          </Button>
        </div>
      </div>
    </div>
  );
};
