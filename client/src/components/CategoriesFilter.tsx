import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../context/CategoryContext";
import api from "../services/api";
import type { Category } from "../types/interface";

function CategoriesFilter() {
  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/api/categories");
        setCategories(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const handleSelectCategory = (categoryName: string) => {
    const category =
      categories.find((category) => category.name === categoryName) || null;
    setSelectedCategory(category);
  };

  return (
    <section>
      <select
        name="selectedCategory"
        id={selectedCategory?.name || ""}
        onChange={(e) => handleSelectCategory(e.target.value)}
      >
        <option value="">Toutes</option>

        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </section>
  );
}

export default CategoriesFilter;
