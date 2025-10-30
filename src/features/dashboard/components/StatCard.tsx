import type { Stat } from "@features/dashboard/types"
import { useTranslation } from "react-i18next"

export default function StatCard({ title, total }: Stat) {
    const { t } = useTranslation()

    return (
        <div className="bg-card dark:bg-card-dark p-6 rounded-md shadow-md animate-slide-in-top">
            <h4 className="text-text-secondary dark:text-text-secondary-dark font-inter text-sm">
                {t(title)}
            </h4>
            <p className="text-3xl font-bold dark:text-text-secondary-dark ">
                {total}
            </p>
        </div>
    )
}