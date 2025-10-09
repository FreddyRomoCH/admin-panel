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

interface ActivityChartProps {
    data: ActivityDataPoint[]
}

export default function ActivityChart({ data }:ActivityChartProps) {

    return (
         <div className="w-full h-64">
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
                    stroke="#0F172A"
                    strokeWidth={2}
                    dot={false}
                    name="Recipes"
                />
                <Line
                    type="monotone"
                    dataKey="projects"
                    stroke="#137FEC"
                    strokeWidth={2}
                    dot={false}
                    name="Projects"
                />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}