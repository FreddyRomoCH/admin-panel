import Skeleton from "@/components/ui/Skeleton";
import type { GHProjects } from "@features/projects/types";
import CardProjects from "./CardProjects";

interface SectionProjectsProps {
    gitHubProjects: GHProjects[],
    loading:boolean
}

export default function SectionProjects({ gitHubProjects, loading }:SectionProjectsProps) {
    return (
        gitHubProjects?.length > 0 ? (
            gitHubProjects.map((project: GHProjects) => (
                <div key={project.id}>
                    {loading ? (
                        <Skeleton />
                    ):(
                        <CardProjects {...project} />
                    )}
                </div>
            ))
        ) : (
            !loading && <p>No recipes found</p>
        )
    )
}