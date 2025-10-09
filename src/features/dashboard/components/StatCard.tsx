import type { Stat } from "@features/dashboard/types"

export default function StatCard({ title, total }: Stat) {
    return (
        <div className="bg-card p-6 rounded-md shadow-md">
            <h4 className="text-text-secondary font-inter text-sm">{title}</h4>
            <p className="text-3xl font-bold">{total}</p>
        </div>
    )
}