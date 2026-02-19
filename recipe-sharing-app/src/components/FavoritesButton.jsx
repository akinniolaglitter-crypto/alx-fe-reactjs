import { useRecipeStore } from './recipeStore';

const FavoritesButton = ({ recipeId }) => {
  const isFavorite = useRecipeStore(state => state.favorites.includes(recipeId));
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  return (
    <button onClick={toggleFavorite}>
      {isFavorite ? 'Unfavorite' : 'Favorite'}
    </button>
  );
};

export default FavoritesButton;
