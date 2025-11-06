import { create } from "zustand";
import type { UserType } from "@/types/users";
import { fetchUsersFromDB } from "@/lib/api/usersApi";
import { changeTheme } from "@/features/login/lib/supabaseAuth";

interface UsersState {
    users: UserType[]
    loading: boolean
    error: boolean
    fetchUsers: () => Promise<void>
    themeUser: (theme: "light" | "dark") => Promise<boolean>
}

export const useUsersStore = create<UsersState>((set, get) => ({
    users: [],
    loading: true,
    error: false,
    fetchUsers: async () => {

        // Checking if we have Users already mounted
        const { users } = get()

        // if there is data, we use it and dont load again
        if (users.length > 0) {
            set({ loading: false })
            return
        }

        try {
            set({ loading: true })
            
            const data = await fetchUsersFromDB()

            if (!data) {
                set({ error: true, loading: false })
                return
            }

            set({ users: data, loading: false })
        } catch (error) {
            console.log("Unable to fetch users", error)
            set({ error: true, loading: false })
        }

    },

    themeUser: async (theme: "light" | "dark") => {
        try {
            set({ loading: true })
            
            const { data, error } = await changeTheme(theme)

            console.log("Change theme response:", { data, error })

            if (error || !data) {
                set({ error: true, loading: false })
                return false
            }

            set((state) => ({
                users: state.users.map((user) =>
                    user.id === data.id ? { ...user, theme: data.theme } : user
                ),
                loading: false,
                error: false
            }))

            return true
            
        } catch (error) {
            console.log("Unable to update user theme", error)
            set({ error: true, loading: false })
            return false
        }
    }
}))