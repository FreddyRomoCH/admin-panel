import Skeleton from "@/components/ui/Skeleton";
import type { GHProjects } from "@features/projects/types";
import CardProjects from "./CardProjects";
import type { TopicsGitHub } from "@/types/topicsGitHub";

interface SectionProjectsProps {
    gitHubProjects: GHProjects[],
    loading:boolean,
    setTech: (value:TopicsGitHub["value"]) => void
}

export default function SectionProjects({ gitHubProjects, loading, setTech }:SectionProjectsProps) {
    return (
        loading ? (
            Array.from({ length: 4 }).map((_, i) => (
                <article key={i} className="flex flex-col justify-between items-center rounded-lg bg-card overflow-hidden h-full">
                    <Skeleton />
                </article>
            ))
        ) : (
            gitHubProjects?.length > 0 ? (
                gitHubProjects.map((project: GHProjects) => (
                    <div key={project.id}>
                        <CardProjects setTech={setTech} {...project} />
                    </div>
                ))
            ) : (
                !loading && <p>No recipes found</p>
            )
        )
        
    )
}