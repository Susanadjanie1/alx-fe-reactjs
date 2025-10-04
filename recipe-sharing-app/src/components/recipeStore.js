import create from 'zustand';

const useRecipeStore = create(set => ({
  recipes: [
    { id: 1, title: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish.', ingredients: ['spaghetti', 'eggs', 'parmesan cheese', 'pancetta'], cookingTime: '20 mins' },
    { id: 2, title: 'Chicken Curry', description: 'A rich and creamy chicken curry.', ingredients: ['chicken', 'onions', 'curry powder', 'coconut milk'], cookingTime: '45 mins' },
    { id: 3, title: 'Vegetable Stir-fry', description: 'Quick and healthy stir-fry.', ingredients: ['broccoli', 'carrots', 'bell peppers', 'soy sauce'], cookingTime: '15 mins' }
  ],
  searchTerm: '',
  favorites: [],
  recommendations: [],
  setSearchTerm: (term) => {
    set({ searchTerm: term });
  },
  addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, newRecipe] })),
  deleteRecipe: (recipeId) => set(state => ({
    recipes: state.recipes.filter(recipe => recipe.id !== recipeId)
  })),
  updateRecipe: (updatedRecipe) => set(state => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    )
  })),
  addFavorite: (recipeId) => set(state => ({
    favorites: [...state.favorites, recipeId]
  })),
  removeFavorite: (recipeId) => set(state => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),
  generateRecommendations: () => set(state => {
    const recommended = state.recipes.filter(recipe =>
      !state.favorites.includes(recipe.id) && Math.random() > 0.5
    );
    return { recommendations: recommended };
  }),
  setRecipes: (recipes) => set({ recipes })
}));

export default useRecipeStore;
