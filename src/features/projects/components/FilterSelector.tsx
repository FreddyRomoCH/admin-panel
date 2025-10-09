import { TOPICS } from "@/constants/getTopics"
import type { TopicsGitHub } from "@/types/topicsGitHub"
import IconArrowDown from "@/assets/IconArrowDown"

interface FilterSelectorProps {
    tech: TopicsGitHub["value"],
    setTech: (value:TopicsGitHub["value"]) => void
}

export default function FilterSelector({ tech, setTech }:FilterSelectorProps) {
    return (
        <div className="relative inline-block w-56">
            <select onChange={(e) => setTech(e.target.value)} value={tech} name="technology" id="technology" className="appearance-none w-full bg-card border-2 border-border rounded-md px-2 text-sm text-red focus:outline-none focus:ring-2 focus:ring-primary text-text-secondary">
                <option className="text-text-secondary" value="all">Technology</option>
                {
                    TOPICS.map((technology:TopicsGitHub) => (
                        <option key={technology.value} value={technology.value}>{technology.label}</option>
                    ))
                }
            </select>
            <IconArrowDown color="text-secondary-text" />
        </div>
    )
}
