import { useEffect, useMemo, useState } from "react"
import type { Filters, GHProjects } from "@features/projects/types"
import type { TopicsGitHub } from "@/types/topicsGitHub"
import { fetchGitHubRepos } from "@/lib/api/gitHubClient"

export function useProjects() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [gitHubProjects, setGithubProjects] = useState<GHProjects[]>([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<Filters["value"]>("all")
    const [tech, setTech] = useState<TopicsGitHub["value"]>("all")
    const perPage = 4

    useEffect(() => {
        async function getGitHubProjects() {
            try {
                const projects = await fetchGitHubRepos({page:page, perPage:100})

                if (!projects.data.length) {
                    setError(true)
                    return
                }
                
                setGithubProjects(projects.data)

            } catch (error) {
                console.error("Error fetching GitHub projects:", error)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        getGitHubProjects()
    }, [])


    // useMemo to use filters
    const filteredProjects = useMemo(() => {
        let results = gitHubProjects

        if (tech !== "all") {
            results = results.filter(repo => repo.topics?.includes(tech))
        }

        if (filter === "client") {
            results = results.filter(repo => repo.topics?.includes("client"))
        } else if (filter === "personal") {
            results = results.filter(repo => !repo.topics?.includes("client"))
        }

        return results
    }, [filter, tech, gitHubProjects])

    // Pagination from UI
    const totalPages = Math.ceil(filteredProjects.length / perPage)

    const paginatedProjects = useMemo(() => {
        const start = (page - 1) * perPage
        const end = start + perPage
        const sliced = filteredProjects.slice(start, end)

        setHasMore(page < totalPages)

        return sliced
    }, [filteredProjects, page, totalPages])


    // Pagination functions

    function nextPage() {
        setPage(prev => (prev < totalPages ? prev + 1 : prev))
    }

    function prevPage() {
        setPage(prev => (prev > 1 ? prev - 1 : prev))
    }

    function goToPage(num: number) {
        if (num >= 1 && num <= totalPages) setPage(num)
    }

    // Always returns to page 1 when changing filters
    useEffect(() => {
        setPage(1)
    }, [filter, tech])

    return { loading, error, gitHubProjects: paginatedProjects, hasMore, page, totalPages, filter, tech, setTech, setFilter, goToPage, nextPage, prevPage }
}