import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats"
import { useActivityChart } from "@/features/dashboard/hooks/useActivityChart";
import { useRecentItems } from "@/features/dashboard/hooks/useRecentItems";
import { useClientsStore } from "@/store/useClientsStore";
import { useEffect } from "react";
import Error from "@/components/shared/Error";
import StatsSection from "@features/dashboard/components/StatsSection";
import RecentItemsSection from "@features/dashboard/components/RecentItemsSection";
import ChartSection from "@features/dashboard/components/ChartSection";
import { useAuthStore } from "@/store/useAuthStore";

export default function Dashboard() {
    const { error: statsError , loading: dashboardStatsLoading, totalRepos, totalRecipes } = useDashboardStats()
    const { error: recentItemsError, loading: recentLoading, recentItems } = useRecentItems()
    const { error: chartError, loading: chartLoading, totalRecipesChart } = useActivityChart()
    const { error: totalClientsError, clients, loading: clientsLoading, showClients } = useClientsStore()
    const { user } = useAuthStore()

    useEffect(() => {
        if (!user?.id) return
        
        showClients(user?.id)
    }, [user?.id])

    const totalClients = totalClientsError ? 0 : clients.length
    const isLoading = dashboardStatsLoading && clientsLoading
    const isPageError = statsError && recentItemsError && chartError

    if (isPageError) return <Error type="page" />

    return (
        <div className="flex flex-col justify-center items-center md:h-full md:-mt-12">
            {statsError ? (
                <Error type="section" />
            ):(
                <StatsSection
                    totalRepos={totalRepos}
                    totalRecipes={totalRecipes}
                    totalClients={totalClients}
                    isLoading={isLoading}
                />
            )}

            <main className="grid grid-cols-12 md:grid-cols-9 gap-4 mt-8 w-full">
                <section className="col-span-12 md:col-span-6 bg-card dark:bg-background-dark py-6 md:p-6 rounded-md shadow-md">
                    {chartError ? (
                        <Error type="section" />
                    ) : (
                        <ChartSection 
                            title="Activity" 
                            loading={chartLoading} 
                            data={totalRecipesChart} 
                        />
                    )}
                    
                </section>

                <section className="col-span-12 md:col-span-3 bg-card dark:bg-background-dark py-6 md:p-6 rounded-md shadow-md animate-slide-in-right">
                    {recentItemsError ? (
                        <Error type="section" />
                    ) : (
                        <RecentItemsSection 
                            loading={recentLoading} 
                            items={recentItems} 
                        />
                    )}
                    
                </section>
                
            </main>
        </div>
    )
}