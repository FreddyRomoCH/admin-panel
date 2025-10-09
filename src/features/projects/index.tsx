import { useProjects } from "@features/projects/hooks/useProjects"
import FiltersProjects from "@features/projects/components/FiltersProjects"
import IconPrev from "@/assets/IconPrev"
import IconNext from "@/assets/IconNext"
import ProjectsPagination from "@features/projects/components/ProjectsPagination"
import SectionProjects from "@features/projects/components/SectionProjects"
import Skeleton from "@/components/ui/Skeleton"

export default function Projects() {
    const {loading, error, gitHubProjects, hasMore, page, totalPages, goToPage, nextPage, prevPage, filter, setFilter, tech, setTech} = useProjects()

    return (
        <div>
            {error && (
                <div>Error</div>
            )}
            
            <header className="mb-8">
                {loading ? (
                    <Skeleton />
                ) : (
                    <FiltersProjects filter={filter} setFilter={setFilter} tech={tech} setTech={setTech} />
                )}
            </header>

            <main className="grid grid-cols-2 md:grid-cols-4 gap-6 items-stretch mb-8">
                <SectionProjects gitHubProjects={gitHubProjects} loading={loading} setTech={setTech} />
            </main>

            <footer className="flex justify-center items-center gap-4 animate-slide-in-bottom">
                <button className="cursor-pointer disabled:opacity-50" onClick={prevPage} disabled={page === 1 || loading}>
                    <IconPrev color="text-primary" />
                </button>

                <ProjectsPagination totalPages={totalPages} currentPage={page} onPageChange={goToPage} />

                <button className="cursor-pointer disabled:opacity-50" onClick={nextPage} disabled={!hasMore || loading}>
                    <IconNext color="text-primary" />
                </button>
            </footer>
        </div>
    )
}