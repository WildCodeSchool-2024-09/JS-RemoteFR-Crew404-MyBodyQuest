import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "../styles/Food.module.css";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
}

const Recipe = () => {
  const { idMeal } = useParams<{ idMeal: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`,
        );
        setRecipe(response.data.meals[0]);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de la recette",
          error,
        );
      }
    };

    fetchRecipe();
  }, [idMeal]);

  if (!recipe) {
    return <div>Chargement...</div>;
  }

  return (
    <section className={style.detailRecette}>
      <h2>{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>Instructions</h3>
      <p>{recipe.strInstructions}</p>
    </section>
  );
};

export default Recipe;
