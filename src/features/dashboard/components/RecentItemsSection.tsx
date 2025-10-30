import Skeleton from "@/components/ui/Skeleton";
import RecentItems from "@features/dashboard/components/RecentItems";
import type { RecentItem } from "@features/dashboard/types";
import { useTranslation } from "react-i18next";

interface RecentItemsSectionProps {
    loading: boolean
    items: RecentItem[]
}

export default function RecentItemsSection({ loading, items }: RecentItemsSectionProps) {
    const { t } = useTranslation()

    return (
        <>
            <h2 className="text-lg text-text-primary font-bold dark:text-card">
                { t("Recent Items") }
            </h2>
            {

                loading ? (
                    <Skeleton />
                ) : (
                    items.map((item) => (
                        <RecentItems key={item.id} {...item} />
                    ))
                )
            }
        </>
    )
}