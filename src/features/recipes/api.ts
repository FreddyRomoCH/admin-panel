import { supabase } from "@/lib/supabaseClient"
import type { Recipes } from "@/features/recipes/types"

const adminKey = import.meta.env.VITE_ADMIN_KEY

export async function fetchRecipesWithCategories() {
    const {data, error} = await supabase
        .from("recipes")
        .select(`
            id,
            title,
            description,
            main_image,
            servings,
            prep_time,
            country,
            ingredients,
            instructions,
            user_id,
            is_active,
            recipe_categories (
                categories (
                    id,
                    name
                )
            )
        `)
        .order("created_at", { ascending: false })

    if (error) {
        console.log(error, "Error fetching data")
        throw error
    }

    return data ?? []
}

export async function addingRecipeToBD(newRecipe: Recipes) {
    const {data: newRecipeData, error: recipeError} = await supabase
        .from("recipes")
        .insert([
            {
                title: newRecipe.title,
                description: newRecipe.description,
                main_image: newRecipe.main_image,
                servings: newRecipe.servings,
                prep_time: newRecipe.prep_time,
                country: newRecipe.country,
                ingredients: newRecipe.ingredients,
                instructions: newRecipe.instructions,
                user_id: adminKey
            }
        ])
        .select("id")
        .single()

    if (recipeError) {
        throw recipeError
    }

    // Add data recipe_categories
    const categoryIds = newRecipe.recipe_categories
        .map(c => Number(c.categories?.id))
        .filter(id => !isNaN(id))

    const {error: newRecipeCategories} = await supabase
        .from("recipe_categories")
        .insert(
            categoryIds.map(catId => ({
                recipe_id: newRecipeData.id,
                categories_id: catId
            }))
        )

    if (newRecipeCategories) {
        throw newRecipeCategories
    }

    return {
        id: newRecipeData.id,
        title: newRecipe.title,
        description: newRecipe.description,
        main_image: newRecipe.main_image,
        servings: newRecipe.servings,
        prep_time: newRecipe.prep_time,
        country: newRecipe.country,
        ingredients: newRecipe.ingredients,
        instructions: newRecipe.instructions
    } as Recipes
}

export async function updateRecipeFromBD (updateRecipe: Recipes) {
    const {error: recipeError} = await supabase
        .from("recipes")
        .update({
            title: updateRecipe.title,
            description: updateRecipe.description,
            main_image: updateRecipe.main_image,
            servings: updateRecipe.servings,
            prep_time: updateRecipe.prep_time,
            country: updateRecipe.country,
            ingredients: updateRecipe.ingredients,
            instructions: updateRecipe.instructions
        })
        .eq("id", updateRecipe.id)

    if (recipeError) {
        throw recipeError
    }

    // Save data recipe_categories
    const categoryIds = updateRecipe.recipe_categories
        .map(c => Number(c.categories?.id))
        .filter(id => !isNaN(id))

    //Delete old relation between recipe and category
    const {error: errorRecipeCategories} = await supabase
        .from("recipe_categories")
        .delete()
        .eq("recipe_id", updateRecipe.id)

    if (errorRecipeCategories) {
        throw errorRecipeCategories
    }

    const {error: newRecipeCategories} = await supabase
        .from("recipe_categories")
        .insert(
            categoryIds.map(catId => ({
                recipe_id: updateRecipe.id,
                categories_id: catId
            }))
        )

    if (newRecipeCategories) {
        throw newRecipeCategories
    }

    return {
        id: updateRecipe.id,
        title: updateRecipe.title,
        description: updateRecipe.description,
        main_image: updateRecipe.main_image,
        servings: updateRecipe.servings,
        prep_time: updateRecipe.prep_time,
        country: updateRecipe.country,
        ingredients: updateRecipe.ingredients,
        instructions: updateRecipe.instructions
    } as Recipes
}

export async function deleteRecipeFromBD(deleteRecipeID: Recipes["id"]) {
    const {error: recipeDeleteCateError} = await supabase
        .from("recipe_categories")
        .delete()
        .eq("recipe_id", deleteRecipeID)

    if (recipeDeleteCateError) throw recipeDeleteCateError

    const {error: recipeDeleteRecipe} = await supabase
        .from("recipes")
        .delete()
        .eq("id", deleteRecipeID)

    if (recipeDeleteRecipe) throw recipeDeleteRecipe

    if (!recipeDeleteCateError && !recipeDeleteRecipe) return true
}

export async function changeStatusRecipeFromDB(newStatus: string, recipeID: Recipes["id"]) {
    const {error: statusRecipeError} = await supabase
        .from("recipes")
        .update({
            is_active: newStatus === "yes" ? true : false
        })
        .eq("id", recipeID)

    if (statusRecipeError) throw statusRecipeError

    return true
}