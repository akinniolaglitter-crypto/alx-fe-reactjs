import { useRecipeStore } from './recipeStore';

const RecommendationsList = () => {
   const recommendations = useRecipeStore(state => state.recommendations);
   
   return (
     <div className="recommendations-list">
       <h2>Recommendations</h2>
       {recommendations.map(recipe => (
         <div key={recipe.id} className="recipe-card">
           <h3>{recipe.title}</h3>
           <p>{recipe.description}</p>
         </div>
       ))}
     </div>
   );
};

export default RecommendationsList;
