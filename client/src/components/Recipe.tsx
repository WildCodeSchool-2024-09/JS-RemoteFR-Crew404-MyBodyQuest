import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "../styles/Recipe.module.css";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
}

const Recipe = () => {
  const { idMeal } = useParams<{ idMeal: string }>();
  const navigate = useNavigate();
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
    <section className={style.detailRecipe}>
      <h2 className={style.nameRecipe}>{recipe.strMeal}</h2>
      <img
        className={style.photoRecipe}
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
      />
      <h3>Recette</h3>
      <p className={style.instructionsRecipe}>{recipe.strInstructions}</p>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={style.backButton}
      >
        Retour
      </button>
    </section>
  );
};

export default Recipe;
