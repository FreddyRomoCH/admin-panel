import { fetchSupabaseTotalRecipes } from "@/features/dashboard/api"; 
import { fetchGitHubRepos } from "@/lib/api/gitHubClient";
import { useEffect, useState } from "react";

export function useDashboardStats() {
    const [loading, setLoading] = useState(true)
    const [totalRepos, setTotalRepos] = useState<number | null>(null)
    const [totalRecipes, setTotalRecipes] = useState<number | null>(null)

    useEffect(() => {
        async function getDashboardData() {
            try {
                const [repos, recipesCount] = await Promise.all([
                    fetchGitHubRepos(),
                    fetchSupabaseTotalRecipes()
                ])

                const totalRespos = repos.data.length

                setTotalRepos(totalRespos)
                setTotalRecipes(recipesCount)
            } catch (error) {
                console.log(error, "Error fetching Dashboard data")
            } finally {
                setLoading(false)
            }
        }

        getDashboardData()
    }, [])

    return { loading, totalRepos, totalRecipes }
}

