import StatCard from "@/features/dashboard/components/StatCard";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats"
import { useActivityChart } from "@/features/dashboard/hooks/useActivityChart";
import { useRecentItems } from "@/features/dashboard/hooks/useRecentItems";
import RecentItems from "@features/dashboard/components/RecentItems";
import ActivityChart from "@features/dashboard/components/ActivityChart";
import Skeleton from "@/components/ui/Skeleton";

export default function Dashboard() {
    const { loading: dashboardStatsLoading, totalRepos, totalRecipes } = useDashboardStats()
    const { loading: recentLoading, recentItems } = useRecentItems()
    const { loading: chartLoading, totalRecipesChart } = useActivityChart()

    return (
        <div>
            <header className="grid grid-cols-3 gap-4 mt-2">
                {dashboardStatsLoading ? (
                    <>
                    {Array.from({length: 3}).map((_, i) => (
                        <Skeleton key={i} />
                    ))}
                    </>
                ) : (
                    <>
                        <StatCard title="Total Projects" total={totalRepos ?? 0} />
                        <StatCard title="Published Recipes" total={totalRecipes ?? 0} />
                        <StatCard title="Active Clients" total={1} />
                    </>
                )}
            </header>

            <main className="grid grid-cols-9 gap-4 mt-8">
                <section className="col-span-6 bg-card p-6 rounded-md shadow-md">
                    <h2 className="text-lg text-text-primary font-bold mb-8">Activity</h2>
                    { chartLoading ? (
                        <Skeleton />
                    ) : (
                        <ActivityChart data={totalRecipesChart} />
                    ) }
                </section>

                <section className="col-span-3 bg-card p-6 rounded-md shadow-md animate-slide-in-right">
                    <h2 className="text-lg text-text-primary font-bold">Recent Items</h2>
                    {
                        recentItems.map((item) => (
                            <RecentItems key={item.id} recentLoading={recentLoading} {...item} />
                        ))
                    }
                </section>
                
            </main>
        </div>
    )
}