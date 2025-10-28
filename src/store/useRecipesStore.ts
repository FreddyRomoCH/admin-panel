import { create } from "zustand"
import { addingRecipeToBD, fetchRecipesWithCategories, updateRecipeFromBD } from "@/features/recipes/api"
import type { Recipes } from "@/features/recipes/types"

interface RecipesState {
    recipes: Recipes[]
    loading: boolean
    error: boolean
    fetchRecipes: () => Promise<void>
    addRecipes: (newRecipes: Recipes) => Promise<void>
    updateRecipe: (updateRecipes: Recipes) => Promise<boolean>
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
            set({ loading: false })
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
        } catch (error) {
            console.log("Unable to fetch recipes", error)
            set({ error: true, loading: false })
        }
    },
    addRecipes: async (newRecipe: Recipes) => {
        set({ loading: true })
        
        try {
            const added = await addingRecipeToBD(newRecipe)

        if (!added) {
                set({ error: true, loading: false })
                return
            }

            set((state) => ({
                recipes: [newRecipe, ...state.recipes],
                loading: false,
                error: false
            }))
            return
        } catch (error) {
            console.error("Error Adding recipe", error)
            set({ error: true, loading: false })
            return
        }
    },
    updateRecipe: async (updateRecipe: Recipes) => {

        try {
            set({ loading: true })

            const updated = await updateRecipeFromBD(updateRecipe)

            if (!updated) {
                set({error: true, loading: false})
                return false
            }

            set((state) => ({
                recipes: state.recipes.map((recipe) => 
                    recipe.id === updateRecipe.id ? { ...recipe, ...updateRecipe } : recipe
                ),
                loading: false,
                error: false
            }))
            return true

        } catch (error) {
            console.log("Error updating recipe", error)
            set({ error: true, loading: false })
            return false
        }
    }
}))