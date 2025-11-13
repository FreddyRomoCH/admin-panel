import Skeleton from "@/components/ui/Skeleton";
import type { GHProjects } from "@features/projects/types";
import CardProjects from "./CardProjects";
import type { TopicsGitHub } from "@/types/topicsGitHub";
import { useTranslation } from "react-i18next";

interface SectionProjectsProps {
    gitHubProjects: GHProjects[],
    loading:boolean,
    setTech: (value:TopicsGitHub["value"]) => void
}

export default function SectionProjects({ gitHubProjects, loading, setTech }:SectionProjectsProps) {
    const { t } = useTranslation()

    return (
        loading ? (
            Array.from({ length: 4 }).map((_, i) => (
                <article 
                    key={i} 
                    className="flex flex-col justify-between items-center rounded-lg bg-card dark:bg-card-dark overflow-hidden h-full"
                >
                    <Skeleton />
                </article>
            ))
        ) : (
            gitHubProjects?.length > 0 ? (
                <main className="grid grid-cols-[repeat(auto-fit,_minmax(250px,250px))] gap-6 justify-center mb-8 w-full">
                    {
                        gitHubProjects.map((project: GHProjects) => (
                                <CardProjects 
                                    key={project.id}
                                    setTech={setTech} {...project} 
                                />
                    ))
                    }
                </main>
            ) : (
                !loading && 
                    <p className="text-red-500 w-full text-center mb-8">
                        {t("No projects found")}
                    </p>
            )
        )
        
    )
}