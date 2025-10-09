import { TOPICS } from "@/constants/getTopics"

interface TopicItemProps {
    topic: string
}

export default function TopicItem({ topic }:TopicItemProps) {
    const matchedTopic = TOPICS.find((t) => t.value === topic)

    return (
        <li 
            className={`text-xs rounded-2xl px-2 py-1 font-medium`} 
            style={{ 
            backgroundColor: matchedTopic?.bg || "var(--color-gray-300)",
            color: matchedTopic?.color
            }}
        >
            {topic.charAt(0).toUpperCase() + topic.slice(1)}
        </li>
    )
}