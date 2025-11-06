export interface UserType {
    id: string
    first_name: string
    last_name: string
    username: string
    email: string
    avatar?: string
    is_admin: boolean
    last_login: string
    created_at: string
    theme?: "light" | "dark"
    language?: "en" | "es"
}