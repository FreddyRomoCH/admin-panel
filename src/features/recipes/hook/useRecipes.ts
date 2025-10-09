import { useEffect, useState } from "react"
import { fetchRecipesWithCategories } from "@features/recipes/api"
import type { Recipes } from "@features/recipes/types"

export function useRecipes() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [recipes, setRecipes] = useState<Recipes[]>([])

    useEffect(() => {
        async function getRecipes(){
            try {
                const recipes = await fetchRecipesWithCategories()

                if (!recipes.length) {
                    console.log('Unable to fetch recipes')
                    setError(true)
                }

                const recipesNormalized = recipes.map(recipe => ({
                    ...recipe,
                    recipe_categories: recipe.recipe_categories.map(cate => ({
                        categories: Array.isArray(cate.categories) ? cate.categories[0] : cate.categories
                    }))
                }))

                setRecipes(recipesNormalized)

            } catch (error) {
                setError(true)
                return
            } finally {
                setLoading(false)
            }
        }

        getRecipes()
    }, [])

    return { loading, error, recipes }
}