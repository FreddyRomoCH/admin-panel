import { useEffect, useState } from "react"
import type { RecentItem } from "@features/dashboard/types"
import { fetchSupabaseRecentRecipes } from "@features/dashboard/api"
import { fetchGitHubRepos } from "@/lib/api/gitHubClient"

export function useRecentItems() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [recentItems, setRecentItems] = useState<RecentItem[]>([])

    useEffect(() => {
        async function getRecentItems() {
            try {
                const [ repos, recipes ] = await Promise.all([
                    fetchGitHubRepos(),
                    fetchSupabaseRecentRecipes()
                ])

                if (!repos.data.length) {
                    setError(true)
                    throw error
                }

                const githubItems: RecentItem[] = repos.data.slice(0, 3).map((repo: any) => ({
                    id: repo.id.toString(),
                    source: "github",
                    title: repo.name,
                    updatedAt: repo.updated_at,
                    url: repo.html_url,
                }));

                const recipeItems: RecentItem[] = recipes.map((recipe: any) => ({
                    id: recipe.id.toString(),
                    source: "recipe",
                    title: recipe.title,
                    updatedAt: recipe.created_at,
                }))

                const combinedItems = [...githubItems, ...recipeItems].sort(
                    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                )

                setRecentItems(combinedItems.slice(0, 5))

            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        getRecentItems()
    }, [])

    return {error, loading, recentItems}
}