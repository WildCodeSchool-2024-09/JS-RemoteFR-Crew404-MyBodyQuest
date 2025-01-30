import { createContext, useContext, useEffect, useState } from "react";
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
  age: string;
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
    setInterval(() => {
      window.location.href = "/";
    }, 1000);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/users");
        setUser(res.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du user :", error);
      }
    };

    fetchUser();
  }, []);

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
