import { TOPICS } from "@/constants/getTopics"
import type { TopicsGitHub } from "@/types/topicsGitHub"
import IconArrowDown from "@/assets/IconArrowDown"
import { useTranslation } from "react-i18next"

interface FilterSelectorProps {
    tech: TopicsGitHub["value"],
    setTech: (value:TopicsGitHub["value"]) => void
}

export default function FilterSelector({ tech, setTech }:FilterSelectorProps) {
    const { t } = useTranslation()

    return (
        <div className="relative inline-block w-56">
            <select 
                onChange={(e) => setTech(e.target.value)} 
                value={tech} 
                name="technology" 
                id="technology" 
                className="appearance-none w-full bg-card dark:bg-background-dark border-2 border-border dark:border-border-dark rounded-md px-2 text-sm text-red focus:outline-none focus:ring-2 focus:ring-primary text-text-secondary"
            >
                <option 
                    className="text-text-secondary" 
                    value="all"
                >
                    { t("Technology") }
                </option>
                {
                    TOPICS.map((technology:TopicsGitHub) => (
                        <option 
                            key={technology.value} 
                            value={technology.value}
                        >
                            {technology.label}
                        </option>
                    ))
                }
            </select>
            <IconArrowDown 
                className="text-text-secondary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none h-4 w-4" 
            />
        </div>
    )
}
