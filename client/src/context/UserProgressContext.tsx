// src/context/UserProgressContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

interface UserProgress {
  level: number;
  current_xp: number;
}

interface UserProgressContextType {
  userProgress: UserProgress[];
  refreshUserProgress: () => void;
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(
  undefined,
);

export function UserProgressProvider({
  children,
}: { children: React.ReactNode }) {
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        // { userXp: { level, current_xp } }
        const res = await api.post("/api/user_quest");
        setUserProgress(res.data.xpUser);
        console.info(userProgress);
      } catch (error) {
        console.error(error);
      }
    };

    if (userProgress.length === 0) {
      fetchUserProgress();
    }
  }, [userProgress]);

  return (
    <UserProgressContext.Provider
      value={{
        userProgress,
        refreshUserProgress() {},
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
