import { supabase } from "@/lib/supabaseClient"

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

