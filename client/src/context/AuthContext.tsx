import { createContext, useContext, useState } from "react";
import api from "../services/api";
import { success } from "../services/toasts";
import type { User } from "../types/interface";
type AuthContextType = {
  user: User | null;
  handleRegister: (user: User) => void;
  handleLogin: (user: User) => void;
  handleLogout: () => void;
  handleUpdateUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type ChildrenType = { children: React.ReactNode };

export function AuthProvider({ children }: ChildrenType) {
  const [user, setUser] = useState<User | null>(null);

  const handleRegister = async (user: User) => {
    setUser(user);
  };

  const handleLogin = (user: User) => {
    setUser(user);
  };

  const handleUpdateUser = async (user: User) => {
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
    <AuthContext.Provider
      value={{
        user,
        handleLogin,
        handleLogout,
        handleRegister,
        handleUpdateUser,
      }}
    >
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
