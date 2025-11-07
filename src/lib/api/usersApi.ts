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

export async function updateUserFromBD(username: UserType["username"], file: File, fileNameUUID: UserType["avatar"], user_id: UserType["id"]) {
    try {

        if (!fileNameUUID) return
        if (!username && username.trim() === "") return

        // Upload the file to user storage on supabase
        const { error: avatarError } = await supabaseClients.storage
            .from('user')
            .upload(fileNameUUID, file, {
                cacheControl: '3600',
                upsert: false
            })

        if (avatarError) {
            console.error("Error uploading avatar:", avatarError);
            throw avatarError
        }

        // Get public url of the uploaded file
        const { data: publicData } = supabaseClients.storage
            .from('user')
            .getPublicUrl(fileNameUUID)

        // Once uploaded, save the filepath to the table users in column avatar
        const { error: userError, data: userData } = await supabaseClients
            .from('users')
            .update({ 
                avatar: publicData.publicUrl,
                username
            })
            .eq('id', user_id)
            .select("username, avatar")
            .single()

        if (userError) {
            console.error("Error updating user avatar:", userError);
            return
        }
        

        if (userData) {
            return {
                userData
            }
        }

    } catch (error) {
        console.error("Unexpected error updating user:", error)
        return null
    }
}