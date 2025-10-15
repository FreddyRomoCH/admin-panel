import Skeleton from "@/components/ui/Skeleton";
import ActivityChart from "@features/dashboard/components/ActivityChart";
import type { ActivityDataPoint } from "@features/dashboard/types";

interface ChartSection {
    title: string
    loading: boolean
    data: ActivityDataPoint[]
}

export default function ChartSection({ title, loading, data }: ChartSection) {
    return (
        <>
            <h2 className="text-lg text-text-primary font-bold mb-8">{title}</h2>
            { loading ? (
                <Skeleton />
            ) : (
                <ActivityChart data={data} />
            ) }
        </>
    )
}