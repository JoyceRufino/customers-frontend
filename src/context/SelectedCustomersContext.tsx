import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { ClientID } from "../api/types/customers";

type SelectedCustomersContextType = {
  selected: ClientID[];
  isSelected: (id: number) => boolean;
  toggleSelect: (client: ClientID) => void;
  clear: () => void;
};

const SelectedCustomersContext = createContext<
  SelectedCustomersContextType | undefined
>(undefined);

export const SelectedCustomersProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selected, setSelected] = useState<ClientID[]>([]);

  const isSelected = (id: number) => selected.some((c) => c.id === id);

  const toggleSelect = (client: ClientID) => {
    setSelected((prev) => {
      const exists = prev.some((c) => c.id === client.id);
      if (exists) {
        return prev.filter((c) => c.id !== client.id);
      }
      return [...prev, client];
    });
  };

  const clear = () => setSelected([]);

  const value = useMemo(
    () => ({ selected, isSelected, toggleSelect, clear }),
    [selected]
  );

  return (
    <SelectedCustomersContext.Provider value={value}>
      {children}
    </SelectedCustomersContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSelectedCustomers = () => {
  const ctx = useContext(SelectedCustomersContext);
  if (!ctx) {
    throw new Error(
      "useSelectedCustomers must be used within a SelectedCustomersProvider"
    );
  }
  return ctx;
};


