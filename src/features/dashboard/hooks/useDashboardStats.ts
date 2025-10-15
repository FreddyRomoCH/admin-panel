import { fetchSupabaseTotalRecipes } from "@/features/dashboard/api"; 
import { fetchGitHubRepos } from "@/lib/api/gitHubClient";
import { useEffect, useState } from "react";

export function useDashboardStats() {
    const [loading, setLoading] = useState(true)
    const [totalRepos, setTotalRepos] = useState<number | null>(null)
    const [totalRecipes, setTotalRecipes] = useState<number | null>(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function getDashboardData() {
            try {
                const [repos, recipesCount] = await Promise.all([
                    fetchGitHubRepos(),
                    fetchSupabaseTotalRecipes()
                ])

                if (!repos.data.length) {
                    setError(true)
                    throw error
                }

                const totalRespos = repos.data.length

                setTotalRepos(totalRespos)
                setTotalRecipes(recipesCount)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        getDashboardData()
    }, [])

    return { error, loading, totalRepos, totalRecipes }
}

