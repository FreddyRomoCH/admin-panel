import type { UserType } from "@/types/users";
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

export async function updateUserFromBD(
    username: UserType["username"],
    file?: File | null,
    fileNameUUID?: UserType["avatar"] | null,
    user_id?: UserType["id"]
) {
    try {
        if (!user_id) throw new Error("User ID is required")

        let avatarUrl: string | null = null

        if (file && fileNameUUID) {
        const { error: avatarError } = await supabaseClients.storage
            .from("user")
            .upload(fileNameUUID, file, {
                cacheControl: "3600",
                upsert: false
            })

        if (avatarError) {
            console.error("Error uploading avatar:", avatarError)
            throw avatarError
        }

        const { data: publicData } = supabaseClients.storage
            .from("user")
            .getPublicUrl(fileNameUUID)

            avatarUrl = publicData?.publicUrl ?? null
        }

        if (!avatarUrl && (!username || username.trim() === "")) {
            console.warn("No valid updates provided (username or avatar)")
            return null
        }

        
        const updatePayload: Partial<UserType> = {}
        if (username && username.trim() !== "") updatePayload.username = username
        if (avatarUrl) updatePayload.avatar = avatarUrl

        const { data: userData, error: userError } = await supabaseClients
            .from("users")
            .update(updatePayload)
            .eq("id", user_id)
            .select("username, avatar")
            .single()

        if (userError) {
            console.error("Error updating user:", userError)
            throw userError
        }

        return { userData }
    } catch (error) {
        console.error("Unexpected error updating user:", error)
        return null
    }
}
