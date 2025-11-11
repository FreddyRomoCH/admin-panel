export interface Clients {
    client_id: number
    client_name: string
    project_name: string
    project_id: number
    project_status: string
    due_date?: string
    user_id?: string
}

export type NewClient = Omit<Clients, "client_id" | "project_id">