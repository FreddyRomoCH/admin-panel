import { PREP_TIME, type PrepTimeType } from "@features/recipes/lib/utils/getPrepTime"
import { useEffect, useState } from "react"
import type { Recipes } from "@features/recipes/types"
import { useFormContext } from "react-hook-form"

interface RecipePrepTimeProps {
    prep_time: Recipes["prep_time"]
}

export default function RecipePrepTime({ prep_time }: RecipePrepTimeProps) {
    const [selectedPrepTime, setSelectedPrepTime] = useState<PrepTimeType["value"]>(prep_time)
    const {setValue, formState: {errors}} = useFormContext()
    
    const handleChangePrepTime = (t: PrepTimeType["value"]) => {
        setSelectedPrepTime(t)
        setValue("prep_time", t, { shouldValidate: true })
    }

    useEffect(() => {
        setSelectedPrepTime(prep_time)
    }, [prep_time])

    return (
        <>
            <label htmlFor="prep_time" className="text-text-secondary dark:text-text-secondary-dark text-sm">Prep Time</label>
            <select 
                value={selectedPrepTime} 
                onChange={(e) => handleChangePrepTime(Number(e.target.value))} 
                name="prep_time" 
                id="prep_time" 
                className="bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 border-border px-4 py-1"
            >
                {
                    !prep_time && <option value="">Select preparation time</option>
                }
                
                {
                    PREP_TIME.map((time: PrepTimeType) => (
                        <option key={time.value} value={time.value}>{time.name}</option>
                    ))
                }
            </select>
            
            {errors.prep_time && (
                <p className="text-red-600 text-xs mt-1">
                    {String(errors.prep_time.message)}
                </p>
            )}
        </>
    )
}