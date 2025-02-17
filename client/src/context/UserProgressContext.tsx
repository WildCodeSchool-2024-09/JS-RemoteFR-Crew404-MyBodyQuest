// src/context/UserProgressContext.tsx
import { createContext, useContext, useState } from "react";
import api from "../services/api";

interface UserProgress {
  level: number;
  current_xp: number;
}

interface UserProgressContextType {
  userProgress: UserProgress[];
  handleRefreshUserProgress: () => void;
}

const UserProgressContext = createContext<UserProgressContextType | null>(null);

export function UserProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);

  const handleRefreshUserProgress = async () => {
    try {
      const res = await api.get("/api/user_quest");
      setUserProgress(res.data.xpUser);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserProgressContext.Provider
      value={{
        userProgress,
        handleRefreshUserProgress,
      }}
    >
      {children}
    </UserProgressContext.Provider>
  );
}

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error("Error Context");
  }
  return context;
};
