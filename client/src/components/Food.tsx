import axios from "axios";
import { useEffect, useState } from "react";
import style from "../styles/Food.module.css";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strIngredients: string[];
  strInstructions: string;
}

const Food = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<string>("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((response) => {
        const recipesData = response.data.meals;
        setRecipes(recipesData);
        setFilteredRecipes(recipesData);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des recettes", error),
      );
  }, []);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
      .then((response) => {
        const ingredientList = response.data.meals.map(
          (meal: { strIngredient: string }) => meal.strIngredient,
        );
        setIngredients(ingredientList);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des ingrédients", error),
      );
  }, []);

  const handleIngredientFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const ingredient = event.target.value;
    setSelectedIngredient(ingredient);

    if (ingredient) {
      const filtered = recipes.filter((recipe) => {
        return recipe.strIngredients?.some((i) =>
          i.toLowerCase().includes(ingredient.toLowerCase()),
        );
      });
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipes);
    }
  };

  const handleRecipeClick = (idMeal: string) => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      .then((response) => {
        const recipe = response.data.meals[0];
        setSelectedRecipe(recipe);
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des détails de la recette",
          error,
        ),
      );
  };

  return (
    <div className={style.foodContainer}>
      <h1>Recettes avec filtre par ingrédient</h1>

      {/* Sélectionner un ingrédient */}
      <select
        onChange={handleIngredientFilterChange}
        value={selectedIngredient}
      >
        <option value="">Choisir un ingrédient</option>
        {ingredients.map((ingredient) => (
          <option key={ingredient} value={ingredient}>
            {ingredient}
          </option>
        ))}
      </select>

      {/* Affichage des recettes filtrées */}
      <ul className={style.foodList}>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <li
              key={recipe.idMeal}
              onClick={() => handleRecipeClick(recipe.idMeal)}
              onKeyUp={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleRecipeClick(recipe.idMeal);
                }
              }}
            >
              <h2>{recipe.strMeal}</h2>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            </li>
          ))
        ) : (
          <p>Aucune recette trouvée avec cet ingrédient.</p>
        )}
      </ul>

      {/* Affichage des détails de la recette sélectionnée */}
      {selectedRecipe && (
        <div className={style.recipeDetails}>
          <h2>{selectedRecipe.strMeal}</h2>
          <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
          <h3>Instructions</h3>
          <p>{selectedRecipe.strInstructions}</p>
        </div>
      )}
    </div>
  );
};

export default Food;
