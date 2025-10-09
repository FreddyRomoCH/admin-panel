import { supabase } from "@/lib/supabaseClient"

// Fetch Supabse Number of Recipes
export async function fetchSupabaseTotalRecipes() {
    const { count, error } = await supabase
        .from("recipes")
        .select("*", {count: "exact", head:true})

    if (error) {
        console.log(error, "Error fetching total recipes from Supabase")
        throw error
    }

    return count ?? 0
}

// Fetch Supabase Recent Recipes
export async function fetchSupabaseRecentRecipes() {
    const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5)

    if (error) {
        console.log(error, "Error fetching recent recipes from Supabase")
        throw error
    }
    
    return data ?? []
}

//Fetch Number Last Recipes per period of time
export async function fetchSupabaseRecipes() {
    const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        console.log(error, "Error fetching recent recipes from Supabase")
        throw error
    }

    return data ?? []
}