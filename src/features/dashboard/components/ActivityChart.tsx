import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import type { ActivityDataPoint } from "@features/dashboard/types"
import { useTranslation } from "react-i18next";

interface ActivityChartProps {
    data: ActivityDataPoint[]
}

export default function ActivityChart({ data }:ActivityChartProps) {
    const { t } = useTranslation()
    const theme = document.documentElement.getAttribute("data-theme")
    const isDark = theme === "dark"

    return (
        <div className="w-full h-64 animate-blurred-fade-in">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="text-border" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="recipes"
                    stroke={`${isDark ? "#92adc9" : "#0F172A" }`}
                    strokeWidth={2}
                    dot={false}
                    name={`${t("Recipes")}`}
                />
                <Line
                    type="monotone"
                    dataKey="projects"
                    stroke="#137FEC"
                    strokeWidth={2}
                    dot={false}
                    name={`${t("Projects")}`}
                />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}