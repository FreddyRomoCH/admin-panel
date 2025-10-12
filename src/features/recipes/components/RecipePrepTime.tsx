import { PREP_TIME, type PrepTimeType } from "@features/recipes/lib/utils/getPrepTime"
import { useState } from "react"
import type { Recipes } from "../types"

interface RecipePrepTimeProps {
    prep_time: Recipes["prep_time"]
}

export default function RecipePrepTime({ prep_time }: RecipePrepTimeProps) {
    const [selectedPrepTime, setSelectedPrepTime] = useState<PrepTimeType["value"]>(prep_time)
    
    const handleChangePrepTime = (t: PrepTimeType["value"]) => {
        setSelectedPrepTime(t)
    }

    return (
        <>
        <label htmlFor="prep_time" className="text-text-secondary text-sm">Prep Time</label>
        <select value={selectedPrepTime} onChange={(e) => handleChangePrepTime(Number(e.target.value))} name="prep_time" id="prep_time" className="bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 border-border px-4 py-1">
            {
                PREP_TIME.map((time: PrepTimeType) => (
                    <option key={time.value} value={time.value}>{time.name}</option>
                ))
            }
        </select>
        </>
    )
}