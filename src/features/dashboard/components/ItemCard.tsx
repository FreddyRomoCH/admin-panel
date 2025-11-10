import IconProject from "@/assets/IconProject";
import IconRecipe from "@/assets/IconRecipe";
import type { RecentItem } from "@features/dashboard/types";
import { formatRelativeTime } from "@/lib/utils/formstRelativeTime";
import { useTranslation } from "react-i18next";

export default function ItemCard({ title, updatedAt, source }: RecentItem) {
    const { t } = useTranslation()
    const isGithub = source === "github"
    const isRecipe = source === "recipe"

    return (
        <article className="flex items-center gap-4 mt-4">
            <div className="rounded-2xl text-primary dark:text-card bg-background-light dark:bg-card-dark p-3">
                {isRecipe && <IconRecipe className="bg-principal" />}
                {isGithub && <IconProject className="bg-principal" />}
            </div>
            <div>
                <h3 className="text-text-primary dark:text-card text-sm font-bold font-inter">
                    { isGithub && `${t('Project')}: ${title}` }
                    { isRecipe && `${t('New Recipe')}: ${title}` }
                </h3>
                <small className="text-text-secondary">
                    { t('Updated') } {`${formatRelativeTime(updatedAt)}`}
                </small>
            </div>
        </article>
    )
}