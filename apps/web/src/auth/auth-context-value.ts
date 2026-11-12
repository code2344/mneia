import { createContext } from "react";

export type User = {
  id: string;
  firstName: string;
  email: string;
};

export type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);