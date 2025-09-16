import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type AuthUser = {
  name: string;
};

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (name: string) => void;
  logout: () => void;
};

const STORAGE_KEY = "customers_auth_user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AuthUser;
        if (parsed?.name) setUser(parsed);
      }
    } catch {
      setUser(null);
    }
  }, []);

  const login = (name: string) => {
    const authUser = { name };
    setUser(authUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), login, logout }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};


