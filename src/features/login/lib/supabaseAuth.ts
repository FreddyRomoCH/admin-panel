import { supabaseClients } from "@/lib/supabaseClient";

export async function signIn(
    email: string, 
    password: string
) {
    const { data, error } = await supabaseClients.auth.signInWithPassword({
        email,
        password
    })

    // if (error) throw error

    return { data, error }
}

export async function signOut() {
    await supabaseClients.auth.signOut()
}

export async function getCurrentUser() {
    const { data } = await supabaseClients.auth.getUser()
    return data.user
}

export async function changeTheme(theme: "light" | "dark") {
    const { data: { user }, error: userError } = await supabaseClients.auth.getUser()

    if (userError || !user) {
        return { data: null, error: userError || new Error("User not found") }
    }

    const { data, error } = await supabaseClients
        .from("users")
        .update({ theme })
        .eq("id", user.id)
        .select("*")
        .single()

    return { data, error }
}

export async function changeLang(language: "en" | "es") {
    const { data: { user }, error: userError } = await supabaseClients.auth.getUser()

    if (userError || !user) {
        return { data: null, error: userError || new Error("User not found") }
    }

    const { data, error } = await supabaseClients
        .from("users")
        .update({ language })
        .eq("id", user.id)
        .select("*")
        .single()

    return { data, error }
}