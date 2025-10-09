import { useEffect, useMemo, useState } from "react"
import type { Filters, GHProjects } from "@features/projects/types"
import { fetchGitHubRepos } from "@/lib/api/gitHubClient"

export function useProjects() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [gitHubProjects, setGithubProjects] = useState<GHProjects[]>([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filter, setFilter] = useState<Filters["value"]>("all")

    useEffect(() => {
        async function getGitHubProjects() {
            try {
                const projects = await fetchGitHubRepos({page:page, perPage:4})

                if (!projects.data.length) {
                    setError(true)
                    return
                }

                // Filter By Client or Personal
                // let filteredProjects = projects.data

                // if (filter === "client") {
                //     filteredProjects = projects.data.filter((repo:GHProjects) => repo.topics?.includes("client") )
                // }else if (filter === "personal") {
                //     filteredProjects = projects.data.filter((repo:GHProjects) => !repo.topics?.includes("client"))
                // }

                setTotalPages(projects.totalPages)
                setHasMore(projects.data.length === 4)

                setGithubProjects(projects.data)

            } catch (error) {
                console.error("Error fetching GitHub projects:", error)
                setError(true)
                return
            } finally {
                setLoading(false)
            }
        }

        getGitHubProjects()
    }, [page])


    // useMemo to use filters
    const filteredProjects = useMemo(() => {
        if (filter === 'client') {
            return gitHubProjects.filter((repo) => repo.topics?.includes("client") )
        }

        if (filter === "personal") {
            return gitHubProjects.filter((repo) => !repo.topics?.includes("client") )
        }

        return gitHubProjects
    }, [filter, gitHubProjects])

    // Pagination functions

    function nextPage() {
        hasMore && setPage((prev) => prev + 1)
    }

    function prevPage() {
        page > 1 && setPage((prev) => prev - 1)
    }
    
    function goToPage(num: number) {
        setPage(num)
    }

    return { loading, error, gitHubProjects: filteredProjects, hasMore, page, totalPages, filter, setFilter, goToPage, nextPage, prevPage }
}