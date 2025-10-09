import { supabase } from "@/lib/supabaseClient"

export async function fetchRecipesWithCategories() {
    const {data, error} = await supabase
        .from("recipes")
        .select(`
            id,
            title,
            main_image,
            recipe_categories (
                categories (
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

