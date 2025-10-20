import { create } from "zustand";
import { addClientToBD, fetchClientsFromBD, updatePaymentStatus } from "@/features/clients/api";
import type { Clients } from "@/features/clients/types/clients";

interface ClientsState {
    clients: Clients[]
    loading: boolean
    error: boolean
    addClient: (client: Clients) => Promise<void>
    changePaymentStatus: (project_id: Clients["project_id"] | undefined, newValue: string) => Promise<boolean>
    showClients: () => Promise<void>
}

export const useClientsStore = create<ClientsState>((set) => ({
    clients: [],
    loading: true,
    error: false,

    addClient: async (client: Clients) => {
        try {
            const newClient = await addClientToBD({client})

            if (!newClient) {
                set({ error: true, loading: false })
                return
            }

            set((state) => ({
                clients: [newClient, ...state.clients],
                loading: false
            }))
        } catch (error) {
            console.error("Error fetching database", error)
            set({ error: true, loading: false })
        }
    },

    changePaymentStatus: async (project_id, newStatus) => {
        try {
            const data = await updatePaymentStatus(project_id, newStatus)

            if (!data || !data.length) {
                set({ error: true, loading: false })
                return false
            }

            set({ error: false, loading: false })
            return true

        } catch (error) {
            console.error("Error updating payment status", error)
            set({ error: true, loading: false })
            return false
        }
    },

    showClients: async () =>  {
        try {
            const allClients = await fetchClientsFromBD()

            if (!allClients) {
                set({error: true, loading: false})
            }

            set({ clients: allClients, loading: false })
        } catch (error) {
            console.error("Error fetching clients", error)
            set({ error: true, loading: false })
        }
    },
}))