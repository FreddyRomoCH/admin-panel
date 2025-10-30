import IconProject from "@/assets/IconProject";
import IconRecipe from "@/assets/IconRecipe";
import type { RecentItem } from "@features/dashboard/types";
import { formatRelativeTime } from "@/lib/utils/formstRelativeTime";

export default function ItemCard({ title, updatedAt, source }: RecentItem) {
    const isGithub = source === "github"
    const isRecipe = source === "recipe"

    return (
        <article className="flex items-center gap-4 mt-4">
            <div className="rounded-2xl text-primary dark:text-card bg-background-light dark:bg-card-dark p-3">
                {isRecipe && <IconRecipe color="bg-principal" />}
                {isGithub && <IconProject color="bg-principal" />}
            </div>
            <div>
                <h3 className="text-text-primary dark:text-card text-sm font-bold font-inter">
                    { isGithub && `Project: ${title}` }
                    { isRecipe && `New Recipe: ${title}` }
                </h3>
                <small className="text-text-secondary">{ `Updated ${formatRelativeTime(updatedAt)}` }</small>
            </div>
        </article>
    )
}