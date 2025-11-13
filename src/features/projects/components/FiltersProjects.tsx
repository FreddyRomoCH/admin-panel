import { PROJECT_FILTERS } from "@features/projects/constants/filters"
import FilterItem from "@features/projects/components/FilterItem"
import type { Filters } from "@features/projects/types"
import type { TopicsGitHub } from "@/types/topicsGitHub"
import FilterSelector from "@features/projects/components/FilterSelector"

interface FiltersProjectsProps {
    filter: Filters["value"],
    setFilter: (value: Filters["value"]) => void,
    tech: TopicsGitHub["value"],
    setTech: (value:TopicsGitHub["value"]) => void
}


export default function FiltersProjects({ filter, setFilter, tech, setTech }:FiltersProjectsProps) {
    
    return (
        <div>
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 animate-slide-in-top">
                <nav>
                    <ul className="flex items-center gap-10">
                        {PROJECT_FILTERS.map((item) => (
                            <FilterItem 
                                key={item.value} 
                                filter={filter} 
                                setFilter={setFilter} {...item} 
                            />
                        ))}
                    </ul>
                </nav>
                        
                <div className="relative inline-block md:w-32">
                    <FilterSelector 
                        tech={tech} 
                        setTech={setTech} 
                    />
                </div>
                
            </div>
            <div>
            </div>
        </div>
    )
}
