import Skeleton from "@/components/ui/Skeleton";
import StatCard from "@/features/dashboard/components/StatCard";

interface StatsSectionProps {
    totalRepos: number | null
    totalRecipes: number | null
    totalClients: number
    isLoading: boolean
}

export default function StatsSection({ isLoading, totalRepos, totalRecipes, totalClients }: StatsSectionProps) {

    return (
        <header className="grid grid-cols-3 gap-4 mt-2 w-full">
        {
            isLoading ? (
                <>
                {Array.from({length: 3}).map((_, i) => (
                    <Skeleton key={i} />
                ))}
                </>
            ) : (
                <>
                    <StatCard 
                        title="Total Projects" 
                        total={totalRepos ?? 0} 
                    />

                    <StatCard 
                        title="Published Recipes" 
                        total={totalRecipes ?? 0} 
                    />

                    <StatCard 
                        title="Total Clients" 
                        total={totalClients ?? 0} 
                    />
                </>
            )
        }
        </header>
    )
}