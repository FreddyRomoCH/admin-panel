import Skeleton from "@/components/ui/Skeleton";
import ActivityChart from "@features/dashboard/components/ActivityChart";
import type { ActivityDataPoint } from "@features/dashboard/types";
import { useTranslation } from "react-i18next";

interface ChartSection {
    title: string
    loading: boolean
    data: ActivityDataPoint[]
}

export default function ChartSection({ title, loading, data }: ChartSection) {
    const { t } = useTranslation()

    return (
        <>
            <h2 className="text-lg text-text-primary dark:text-text-secondary-dark font-bold mb-8">
                { t(title) }
            </h2>
            { loading ? (
                <Skeleton />
            ) : (
                <ActivityChart data={data} />
            ) }
        </>
    )
}