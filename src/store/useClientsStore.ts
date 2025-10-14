import { create } from "zustand";
import { addClientToBD, fetchClientsFromBD } from "@/features/clients/api";
import type { Clients } from "@/features/clients/types/clients";

interface ClientsState {
    clients: Clients[]
    loading: boolean
    error: boolean
    addClient: (client: Clients) => Promise<void>
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
            set({ error: true, loading: false })
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
            set({ error: true, loading: false })
        }
    },
}))