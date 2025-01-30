import { createContext, useContext, useState } from "react";
import api from "../services/api";
import { success } from "../services/toasts";
type AuthContextType = {
  user: User | null;
  handleLogin: (user: User) => void;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type ChildrenType = { children: React.ReactNode };
type User = {
  id: number;
  firstname: string;
  lastname: string;
  avatar: string;
  email: string;
  password: string;
  birthday_date?: string;
  size: number;
  sexe: string;
  objective: string;
  initial_weight: number;
  desired_weight: number;
  weight_frequency: string;
  current_xp: number;
  level_id: number;
};

export function AuthProvider({ children }: ChildrenType) {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setUser(user);
  };

  const handleLogout = async () => {
    setUser(null);
    const response = await api.post("/api/logout");
    success(response.data.message);
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };
  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used within <AuthProvider>.");
  }
  return value;
};
