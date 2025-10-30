import { useProjects } from "@features/projects/hooks/useProjects"
import FiltersProjects from "@features/projects/components/FiltersProjects"
import ProjectsPagination from "@features/projects/components/ProjectsPagination"
import SectionProjects from "@features/projects/components/SectionProjects"
import Skeleton from "@/components/ui/Skeleton"
import Error from "@/components/shared/Error"

export default function Projects() {
    const {loading, error, gitHubProjects, hasMore, page, totalPages, goToPage, nextPage, prevPage, filter, setFilter, tech, setTech} = useProjects()

    if (error) return <Error type="page" />

    return (
        <div className="flex flex-col justify-center items-center h-full -mt-12">
            <header className="mb-8">
                {loading ? (
                    <Skeleton />
                ) : (
                    <FiltersProjects 
                        filter={filter} 
                        setFilter={setFilter} 
                        tech={tech} 
                        setTech={setTech} 
                    />
                )}
            </header>

            <main className="grid grid-cols-2 md:grid-cols-4 gap-6 items-stretch mb-8">
                <SectionProjects 
                    gitHubProjects={gitHubProjects} 
                    loading={loading} 
                    setTech={setTech} 
                />
            </main>

            <footer className="flex justify-center items-center gap-4">
                <ProjectsPagination 
                    totalPages={totalPages} 
                    currentPage={page} 
                    onPageChange={goToPage} 
                    onNextPage={nextPage} 
                    onPrevPage={prevPage} 
                    hasMore={hasMore} 
                    loading={loading} 
                />
            </footer>
        </div>
    )
}