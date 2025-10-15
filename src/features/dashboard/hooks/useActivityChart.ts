import { useEffect, useState } from "react"
import type { ActivityDataPoint, GitHubRepo } from "@features/dashboard/types"
import { fetchSupabaseRecipes } from "@features/dashboard/api"
import { getWeekNumber } from "@/lib/utils/numberOfTheWeek"
import { fetchGitHubRepos } from "@/lib/api/gitHubClient"

export function useActivityChart() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [totalRecipesChart, setTotalRecipesChart] = useState<ActivityDataPoint[]>([])

    useEffect(() => {
        async function getActivityChart() {
            try {
                const [recipes, repos] = await Promise.all([
                    fetchSupabaseRecipes(),
                    fetchGitHubRepos(),
                ])

                if (!repos.data.length) {
                    setError(true)
                    throw error
                }

                // Recipes by weekle updating
                const recipesChart = recipes.reduce((acc, recipe) => {
                    const week = getWeekNumber(recipe.created_at)

                    if (!isNaN(week)) {
                        acc[week] = (acc[week] || 0) + 1;
                    }
                    return acc
                }, {} as Record<number, number>)

                // Repos by Weekly updating

                const reposChart = repos.data.reduce((acc:any, repo:GitHubRepo) => {
                    const week = getWeekNumber(repo.updated_at)

                    if (!isNaN(week)) {
                        acc[week] = (acc[week] || 0) + 1;
                    }

                    return acc
                }, {} as Record<number, number>)

                // Merging both recipes and repos into array
                const allWeeks = Array.from(
                    new Set([
                        ...Object.keys(recipesChart).map(Number),
                        ...Object.keys(reposChart).map(Number),
                    ])
                ).sort((a, b) => a - b);

                const formatted: ActivityDataPoint[] = allWeeks.map((week) => ({
                    name: `Week ${week}`,
                    recipes: recipesChart[Number(week)] || 0,
                    projects: reposChart[Number(week)] || 0
                }));

                // If no recipes, creates a no data object
                if (formatted.length === 0) {
                    formatted.push({ name: "No data", recipes: 0, projects: 0 });
                    setError(true)
                }

                setTotalRecipesChart(formatted)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        getActivityChart()
    }, [])

    return { error, loading, totalRecipesChart }
}