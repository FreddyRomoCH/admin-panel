import { PROJECT_FILTERS } from "@features/projects/constants/filters"
import FilterItem from "@features/projects/components/FilterItem"
import type { Filters } from "@features/projects/types"

interface FiltersProjectsProps {
    filter: Filters["value"],
    setFilter: (value: Filters["value"]) => void
}

export default function FiltersProjects({ filter, setFilter }:FiltersProjectsProps) {
    
    return (
        <nav>
            <ul className="flex items-center gap-10">
                {PROJECT_FILTERS.map((item) => (
                    <FilterItem key={item.value} filter={filter} setFilter={setFilter} {...item} />
                ))}
            </ul>
        </nav>
    )
}