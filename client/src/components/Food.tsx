import axios from "axios";
import { useEffect, useState } from "react";
import style from "../styles/Food.module.css";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
}

const Food = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categorieSelectionnee, setcategorieSelectionnee] =
    useState<string>("");
  const [recetteSelectionnee, setrecetteSelectionnée] = useState<Recipe | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des catégories", error),
      );
  }, []);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const category = event.target.value;
    setcategorieSelectionnee(category);
    setrecetteSelectionnée(null);

    if (category === "") {
      setRecipes([]);
      return;
    }

    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => {
        setRecipes(response.data.meals || []);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des recettes", error),
      );
  };

  const handleRecipeClick = (idMeal: string) => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      .then((response) => {
        setrecetteSelectionnée(response.data.meals[0]);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération de la recette", error),
      );
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") return;
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((response) => {
        setRecipes(response.data.meals || []);
        setcategorieSelectionnee("");
      })
      .catch((error) =>
        console.error("Erreur lors de la recherche de recettes", error),
      );
  };

  return (
    <section className={style.foodContainer}>
      <h1 className={style.pageTitle}>Alimentation</h1>

      {/* Menu déroulant pour sélectionner une catégorie */}
      <select
        className={style.select}
        onChange={handleCategoryChange}
        value={categorieSelectionnee}
      >
        <option value="">Recettes disponibles</option>
        {categories.map((category) => (
          <option key={category.idCategory} value={category.strCategory}>
            {category.strCategory}
          </option>
        ))}
      </select>

      {/* Barre de recherche */}
      <input
        className={style.recherche}
        type="search"
        id="site-search"
        name="q"
        placeholder="Recherche"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="button"
        className={style.rechercheButton}
        onClick={handleSearch}
      >
        Rechercher
      </button>

      {/* Affichage des recettes */}
      {!recetteSelectionnee && (
        <section className={style.recettesContainer}>
          <ul className={style.foodList}>
            {recipes.length > 0
              ? recipes.map((recipe) => (
                  <section className={style.nomRecette} key={recipe.idMeal}>
                    <button
                      type="button"
                      onClick={() => handleRecipeClick(recipe.idMeal)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleRecipeClick(recipe.idMeal);
                        }
                      }}
                      className={style.recette}
                    >
                      <h3 className={style.recetteTitle}>{recipe.strMeal}</h3>
                      <img
                        className={style.recetteImage}
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                      />
                    </button>
                  </section>
                ))
              : categories.map((category) => (
                  <button
                    className={style.category}
                    type="button"
                    key={category.idCategory}
                    onClick={() =>
                      handleCategoryChange({
                        target: { value: category.strCategory },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                    onKeyUp={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleCategoryChange({
                          target: { value: category.strCategory },
                        } as React.ChangeEvent<HTMLSelectElement>);
                      }
                    }}
                  >
                    <h2 className={style.categoryTitle}>
                      {category.strCategory}
                    </h2>
                    <img
                      className={style.categoryImage}
                      src={category.strCategoryThumb}
                      alt={category.strCategory}
                    />
                  </button>
                ))}
          </ul>
        </section>
      )}

      {/* Affichage des détails d'une recette */}
      {recetteSelectionnee && (
        <section className={style.detailRecette}>
          <h2 className={style.nomRecette}>{recetteSelectionnee.strMeal}</h2>
          <img
            className={style.photoRecette}
            src={recetteSelectionnee.strMealThumb}
            alt={recetteSelectionnee.strMeal}
          />
          <h3>Recette</h3>
          <p className={style.instructionsRecette}>
            {recetteSelectionnee.strInstructions}
          </p>
          <button
            type="button"
            className={style.retour}
            onClick={() => setrecetteSelectionnée(null)}
          >
            Retour
          </button>
        </section>
      )}
    </section>
  );
};

export default Food;
