import type { Filters } from "@features/projects/types"

interface FilterItemsProps extends Filters {
    filter: Filters["value"],
    setFilter: (value: Filters["value"]) => void
}


export default function FilterItem({ filter, setFilter, label, value }:FilterItemsProps) {

    return (
        <li>
            <button 
                onClick={() => setFilter(value)} 
                className={`${filter === value 
                    && `text-white bg-primary/8`}
                text-text-secondary dark:text-text-secondary-dark hover:text-white hover:dark:text-text-secondary-dark text-sm hover:bg-primary/8 rounded-3xl px-3 py-1 cursor-pointer`
                }
            >
                {label}
            </button>
        </li>
    )
}