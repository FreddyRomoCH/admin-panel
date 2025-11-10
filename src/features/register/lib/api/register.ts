import { supabaseClients } from "@/lib/supabaseClient";
import type { RegisterSchemeType } from "@features/register/lib/scheme/registerScheme";

export async function registerUserToBD(data: RegisterSchemeType) {
    const { data: existingUser } = await supabaseClients
        .from("users")
        .select("id")
        .or(`email.eq.${data.email},username.eq.${data.username}`)
        .maybeSingle()

    if (existingUser) {
        return {
            error: "User Already exists"
        }
    }

    // We save the user into the supabase Auth Sign Up to store the password and user ID
    const { data: authData, error: authError } = await supabaseClients.auth.signUp({
        email: data.email,
        password: data.password
    })

    if ( authError ) {
        return {
            error: authError.message
        }
    }


    const { data: registerData, error: registerError } = await supabaseClients
        .from("users")
        .insert({
            "id": authData.user?.id,
            "email": data.email,
            "first_name": data.first_name,
            "last_name": data.last_name,
            "username": data.username,
            "is_admin": data.is_admin
        })
        .select("email")
        .single()

    if (registerError) throw registerError

    return { email: registerData.email }
}