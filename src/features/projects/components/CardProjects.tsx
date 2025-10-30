import type { GHProjects } from "@features/projects/types";
import TopicItem from "@features/projects/components/TopicItem";
import type { TopicsGitHub } from "@/types/topicsGitHub";
import { useTranslation } from "react-i18next";

interface CardProjectsProps extends GHProjects {
  setTech: (value: TopicsGitHub["value"]) => void;
}


export default function CardProjects({ name, html_url, homepage, topics, setTech  }:CardProjectsProps) {
    const { t } = useTranslation()

    return (
        <article 
            className="flex flex-col justify-between items-center rounded-lg bg-card dark:bg-card-dark overflow-hidden h-full animate-fade-in"
        >
            {/* <img src="images/Freddy_pequeno.jpeg" alt="Test" className="h-32 w-full object-cover" /> */}
            <div 
                className="h-32 w-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center"
            >
                <span 
                    className="text-primary dark:text-card text-lg font-semibold"
                >
                    {name}
                </span>
            </div>

            <div className="flex flex-col p-3 w-full justify-between gap-1 flex-1">
                <h3 
                    className="font-semibold capitalize text-base text-text-primary dark:text-card font-inter mb-4"
                >
                    {name}
                </h3>
                {/* <small className="text-text-secondary mb-2 flex-1">In Progress</small> */}
                <ul className="flex justify-start items-center flex-wrap gap-1">
                    {
                        topics && (
                            topics.filter((topic:string) => topic.toLowerCase() !== 'client').map((topic:string) => (
                                <TopicItem key={topic} topic={topic} setTech={setTech} />
                            ))
                        )
                    }
                    
                </ul>
            </div>
            
            <nav className="border-t-1 border-border dark:border-border-dark pt-2 pb-6 w-full px-2 flex justify-between items-center">
                <a 
                    href={html_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-light text-text-secondary dark:text-card text-sm"
                >
                    Repo
                </a>

                {homepage && (
                    <a 
                        href={homepage} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-light text-primary text-sm"
                    >
                        { t("Live Site") }
                    </a>
                )}
            </nav>
        </article>
    )
}