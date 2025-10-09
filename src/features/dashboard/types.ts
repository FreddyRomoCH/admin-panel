export interface Stat {
    title: string,
    total: number,
}

export interface RecentItem {
    id: string,
    source: "github" | "recipe",
    title: string,
    updatedAt: string,
    url?: string,
}

export interface ActivityDataPoint {
    name: string,
    recipes: number,
    projects: number
}

export interface GitHubRepo {
    id: number,
    name: string,
    updated_at: string
}