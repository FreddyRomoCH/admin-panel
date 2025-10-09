import type { RecentItem } from "@features/dashboard/types"
import ItemCard from "@features/dashboard/components/ItemCard"
import { recipesWebURL } from "@/constants/recipesWebPageLink"
import { toSlug } from "@/constants/titleToSlug"
import Skeleton from "@/components/ui/Skeleton"

interface RecentItemsProps extends RecentItem {
    recentLoading: boolean
}

export default function RecentItems({ id, title, updatedAt, source, url, recentLoading }: RecentItemsProps) {
    const isGithub = source === "github"

    const titleSlug = toSlug(title)
    const recipeUrl = `${recipesWebURL}/${id}/${titleSlug}`

    return (
        recentLoading ? (
            <Skeleton />
        ) : (
            <a href={isGithub ? url : recipeUrl} target="_blank" rel="noopener noreferrer">
                <ItemCard key={id} id={id} title={title} updatedAt={updatedAt} source={source} />
            </a>
        )
    )
}