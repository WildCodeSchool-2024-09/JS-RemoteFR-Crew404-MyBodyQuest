import type React from "react";
import { type ReactNode, createContext, useState } from "react";
import type { Category } from "../types/interface";

// Définir la forme des données dans le contexte
interface CategoryContextType {
  selectedCategory: Category | null; // Catégorie sélectionnée
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>; // Méthode pour changer la catégorie
}

// Create context with default value
export const CategoryContext = createContext<CategoryContextType>({
  selectedCategory: null,
  setSelectedCategory: () => {},
});

// Create Provider
export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
