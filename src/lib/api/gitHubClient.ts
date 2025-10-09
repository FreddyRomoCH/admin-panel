import type { GitHubURLTypes } from "@/types/gitHubClientTypes"
import {GITHUB_LINK} from "@constants/gitHubPageLink"
let finalTotalPages = 1

// Fetch GitHub repositories
export async function fetchGitHubRepos({ customURL, page, perPage }:GitHubURLTypes = {}) {
    let url = GITHUB_LINK

    if (customURL) {
        url = GITHUB_LINK
    } else if (page && perPage) {
        url = `${GITHUB_LINK}?per_page=${perPage}&page=${page}`;
    }

    const response = await fetch(url)
    if (!response.ok) {
        throw new Error('Failed to fetch GitHub repositories')
    }

    const data = await response.json()
    
    const linkHeader = response.headers.get("Link")
    // Get TotalPages from header
    let totalPages = finalTotalPages

    if (linkHeader) {
        const match = linkHeader.match(/&page=(\d+)>; rel="last"/)
        if (match) {
            totalPages = parseInt(match[1])
            finalTotalPages = totalPages
        }
    }
    return {
        data: data ?? [],
        totalPages
    }
}