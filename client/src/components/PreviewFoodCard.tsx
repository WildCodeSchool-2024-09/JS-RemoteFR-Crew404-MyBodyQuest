import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../styles/Dashboard.module.css";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const PreviewFoodCard = () => {
  const [randomRecipe, setRandomRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const storedRecipe = localStorage.getItem("dailyRecipe");
    const storedDate = localStorage.getItem("recipeDate");
    const today = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD

    if (storedRecipe && storedDate === today) {
      // Si une recette est stockée et que la date est la même, on la garde
      setRandomRecipe(JSON.parse(storedRecipe));
    } else {
      // Sinon, on récupère une nouvelle recette et on la stocke
      axios
        .get("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((response) => {
          const recipe = response.data.meals[0];
          setRandomRecipe(recipe);
          localStorage.setItem("dailyRecipe", JSON.stringify(recipe));
          localStorage.setItem("recipeDate", today);
        })
        .catch((error) =>
          console.error("Erreur lors de la récupération de la recette", error),
        );
    }
  }, []);

  if (!randomRecipe) {
    return <div>Chargement...</div>;
  }

  return (
    <section className={style.foodCard}>
      <h3>{randomRecipe.strMeal}</h3>
      <img
        className={style.foodImage}
        src={randomRecipe.strMealThumb}
        alt={randomRecipe.strMeal}
      />
      <Link to={`/food/${randomRecipe.idMeal}`}>
        <button type="button" className={style.viewRecipeButton}>
          Voir la recette
        </button>
      </Link>
    </section>
  );
};

export default PreviewFoodCard;
