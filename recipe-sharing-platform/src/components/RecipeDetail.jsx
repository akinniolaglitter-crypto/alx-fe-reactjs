import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import data from "../data.json";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const foundRecipe = data.find((item) => item.id === parseInt(id));
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return <div className="p-6">Recipe not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Link to="/" className="text-blue-500 underline">
        ← Back to Home
      </Link>

      <div className="bg-white rounded-xl shadow-md p-6 mt-4">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />

        <h1 className="text-3xl font-bold mb-4">
          {recipe.title}
        </h1>

        <h2 className="text-xl font-semibold mb-2">
          Ingredients
        </h2>
        <ul className="list-disc list-inside mb-4">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-2">
          Instructions
        </h2>
        <p className="text-gray-700">
          {recipe.instructions}
        </p>
      </div>
    </div>
  );
}

export default RecipeDetail;