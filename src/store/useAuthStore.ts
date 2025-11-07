import { create } from "zustand"
import { supabaseClients } from "@/lib/supabaseClient"
import type { UserType } from "@/types/users"
import { updateUserFromBD } from "@/lib/api/usersApi"

type UpdateUSerResponse = {
    success: boolean
    user?: Pick<UserType, "avatar" | "username">
    error?: string
}

interface AuthState {
    user: UserType | null
    loading: boolean
    initialized: boolean
    setUser: (user: UserType | null) => void
    fetchSession: () => Promise<void>
    updateUser: (
        username: UserType["username"], 
        file?: File | null, 
        avatar?: UserType["avatar"], 
        user_id?: UserType["id"]
    ) => Promise<UpdateUSerResponse>
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

    updateUser: async (username, file, avatar, user_id) => {
        try {
            set({ loading: true })
            
            const data = await updateUserFromBD(username, file || null, avatar || undefined, user_id || "")

            if (!data) {
                set({ loading: false})
                return { success: false, error: "No data returned" }
            }
            set((state) => {
                if (!state.user) return state

                return {
                    user: { ...state.user, avatar: data.userData.avatar, username: data.userData.username },
                    loading: false
                }
            })

            return {
                success: true,
                user: {
                    username: data.userData.username,
                    avatar: data.userData.avatar
                }
            }

        } catch (error) {
            console.log(error)
            set({ loading: false})
            return { success: false, error: (error as Error).message }
        }
    },

    signOut: async () => {
        await supabaseClients.auth.signOut()
        set({ user: null })
    }
}))