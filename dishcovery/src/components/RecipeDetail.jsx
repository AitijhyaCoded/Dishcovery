import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data.meals[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Detail fetch error");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader loadImg="/frying-pan.gif" />;

  return (
    <div className="p-5 border border-textColor rounded-lg">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full max-w-md mx-auto mb-4 rounded-lg"
      />
      <h1 className="text-redTheme font-bold text-3xl mb-4">
        {recipe.strMeal}
      </h1>
      <div className="border border-textColor mb-4"></div>
      <p className="text-gray-700">
        <strong>Category:</strong> {recipe.strCategory}
      </p>
      <h2 className="font-bold text-2xl mt-4 mb-4 underline">Ingredients</h2>
      <ul className="list-disc list-inside mb-6">
        {Array.from({ length: 20 }).map((_, index) => {
          const ingredient = recipe[`strIngredient${index + 1}`];
          const measure = recipe[`strMeasure${index + 1}`];

          return (
            ingredient &&
            ingredient.trim() !== "" && (
              <li key={index}>
                {ingredient} - {measure}
              </li>
            )
          );
        })}
      </ul>
      <h2 className="font-bold text-2xl underline">Instructions</h2>
      <ul className="list-decimal list-inside mt-4 space-y-2">
        {recipe.strInstructions}
      </ul>
      <Link to='/'>
        <button className="mt-4">
            Back to home
        </button>
      </Link>
    </div>
  );
};

export default RecipeDetail;
