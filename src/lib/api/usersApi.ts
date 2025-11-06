import { supabaseClients } from "@lib/supabaseClient";

export async function fetchUsersFromDB() {
    try {

        const { error: usersError, data: usersData } = await supabaseClients
            .from("users")
            .select("*")
            .order("created_at", { ascending: false })

        if (usersError) {
            console.error("Error fetching users:", usersError)
            return null
        }

        return usersData
        
    } catch (error) {
        console.error("Unexpected error fetching users:", error)
        return null
    }
}