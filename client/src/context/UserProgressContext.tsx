// src/context/UserProgressContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

interface UserProgress {
  level: number;
  current_xp: number;
}

interface UserProgressContextType {
  userProgress: UserProgress[];
  refreshUserProgress: (newUserProgress: UserProgress[]) => void;
}

const UserProgressContext = createContext<UserProgressContextType | null>(null);

export function UserProgressProvider({
  children,
}: { children: React.ReactNode }) {
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        // { userXp: { level, current_xp } }
        const res = await api.post("/api/user_quest");
        setUserProgress(res.data.userXp);
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
        refreshUserProgress: (newUserProgress: UserProgress[]) => {
          setUserProgress(newUserProgress);
        },
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
