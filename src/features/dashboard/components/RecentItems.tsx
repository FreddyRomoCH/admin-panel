import type { RecentItem } from "@features/dashboard/types"
import ItemCard from "@features/dashboard/components/ItemCard"
import { recipesWebURL } from "@/constants/recipesWebPageLink"
import { toSlug } from "@/constants/titleToSlug"

interface RecentItemsProps extends RecentItem {}

export default function RecentItems({ id, title, updatedAt, source, url }: RecentItemsProps) {
    const isGithub = source === "github"

    const titleSlug = toSlug(title)
    const recipeUrl = `${recipesWebURL}/${id}/${titleSlug}`

    return (
        <a href={isGithub ? url : recipeUrl} target="_blank" rel="noopener noreferrer">
            <ItemCard key={id} id={id} title={title} updatedAt={updatedAt} source={source} />
        </a>
    )
}