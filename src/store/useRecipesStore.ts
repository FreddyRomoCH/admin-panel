import { create } from "zustand"
import { fetchRecipesWithCategories } from "@/features/recipes/api"
import type { Recipes } from "@/features/recipes/types"

interface RecipesState {
    recipes: Recipes[]
    loading: boolean
    error: boolean
    fetchRecipes: () => Promise<void>
    updateRecipes: (updateRecipes: Recipes) => void
}

export const useRecipesStore = create<RecipesState>((set, get) => ({
    recipes: [],
    loading: true,
    error: false,
    fetchRecipes: async () => {
        // Checking if we have Recipes already mounted
        const { recipes } = get()

        // if there is data, we use it and dont load again
        if (recipes.length > 0) {
            set({ loading: false }) // ✅ aseguras que se apague el loading
            return
        }

        try {
            const data = await fetchRecipesWithCategories()

            const recipesNormalized = data.map(recipe => ({
                ...recipe,
                recipe_categories: recipe.recipe_categories.map(cate => ({
                    categories: Array.isArray(cate.categories) ? cate.categories[0] : cate.categories
                }))
            }))

            set({ recipes: recipesNormalized, loading: false })
        } catch (err) {
            set({ error: true, loading: false })
        }
    },
    updateRecipes: (updateRecipe) =>
        set((state) => ({
            recipes: state.recipes.map((r) =>
                r.id === updateRecipe.id ? updateRecipe : r
            )
        }))
}))