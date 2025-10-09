export interface GHProjects {
    id: number,
    name: string,
    description: string | null,
    html_url: string,
    homepage?: string,
    language?: string,
    updated_at: string,
    topics?: string[]
}

export interface Filters {
    label: string,
    value: "all" | "personal" | "client"
}