import { TOPICS } from "@/constants/getTopics"
import type { TopicsGitHub } from "@/types/topicsGitHub";

interface TopicItemProps {
    topic: string,
    setTech: (value: TopicsGitHub["value"]) => void;
}

export default function TopicItem({ topic, setTech }:TopicItemProps) {
    const matchedTopic = TOPICS.find((t) => t.value === topic)

    return (
        <li 
            className={`text-xs rounded-2xl px-2 py-1 font-medium`} 
            style={{ 
            backgroundColor: matchedTopic?.bg || "var(--color-gray-300)",
            color: matchedTopic?.color
            }}
        >
            <button 
                onClick={() => { setTech(topic) }} 
                className="cursor-pointer"
            >
                {topic.charAt(0).toUpperCase() + topic.slice(1)}
            </button>
        </li>
    )
}