import {
  MarmitonQueryBuilder,
  RECIPE_DIFFICULTY,
  RECIPE_PRICE,
  type Recipe,
  searchRecipes,
} from "marmiton-api";
import { useState } from "react";
import style from "../styles/RecipeSearch.module.css";

const qb = new MarmitonQueryBuilder();

type RecipeWithId = Recipe & { id: string };

const RecipeSearch = () => {
  const [recipes, setRecipes] = useState<RecipeWithId[]>([]);
  const [loading, setLoading] = useState(false);

  // Fonction pour chercher les recettes
  const fetchRecipes = async () => {
    setLoading(true);
    try {
      // Construire ta requête
      const query = qb
        .withTitleContaining("soja")
        .withoutOven()
        .withPrice(RECIPE_PRICE.CHEAP)
        .takingLessThan(45)
        .withDifficulty(RECIPE_DIFFICULTY.EASY)
        .build();

      const fetchedRecipes: Recipe[] = await searchRecipes(query);

      const recipesWithId = fetchedRecipes.map((recipe, index) => ({
        ...recipe,
        id: `recipe-${index}`,
      }));

      setRecipes(recipesWithId);
    } catch (error) {
      console.error("Erreur lors de la recherche de recettes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.searchContainer}>
      <h2 className={style.search}>Rechercher des recettes</h2>
      <button
        className={style.buttonSearch}
        onClick={fetchRecipes}
        disabled={loading}
        type="button"
      >
        {loading ? "Chargement..." : "Chercher des recettes"}
      </button>

      {recipes.length > 0 && (
        <div className={style.resultContainer}>
          <h3 className={style.resultSearch}>Résultats de la recherche :</h3>
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                <h4>{recipe.name}</h4>
                <p>{recipe.description}</p>
                <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                  Voir la recette
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecipeSearch;
