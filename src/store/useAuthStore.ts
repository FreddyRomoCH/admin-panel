import { create } from "zustand"
import { supabaseClients } from "@/lib/supabaseClient"
// import type { User } from "@supabase/supabase-js"
import type { UserType } from "@/types/users"

interface AuthState {
    user: UserType | null
    loading: boolean
    initialized: boolean
    setUser: (user: UserType | null) => void
    fetchSession: () => Promise<void>
    signOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: false,
    initialized: false,
    setUser: (user) => set({ user }),

    fetchSession: async () => {
        set({ loading: true })

        try {
            // Get the current session
            const { data: { session }, error: sessionError } = await supabaseClients.auth.getSession()

            if (sessionError || !session?.user) {
            // if there is no session or error, set user to null
            set({ user: null, loading: false, initialized: true })
            return
            }

            // Fetch the user profile from the "users" table
            const { data: profile, error: profileError } = await supabaseClients
                .from("users")
                .select("*")
                .eq("id", session.user.id)
                .single()

            if (profileError || !profile) {
            set({ user: null, loading: false, initialized: true })
            return
            }

            // Update last login timestamp
            await supabaseClients
                .from("users")
                .update({ last_login: new Date().toISOString() })
                .eq("id", session.user.id)

            // Save the user profile in the store
            set({ user: profile as UserType, loading: false, initialized: true })
        } catch (err) {
            console.error("Error fetching session:", err)
            set({ user: null, loading: false, initialized: true })
        }
    },

    signOut: async () => {
        await supabaseClients.auth.signOut()
        set({ user: null })
    }
}))