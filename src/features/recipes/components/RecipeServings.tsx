import { useEffect, useState } from "react"
import type { Recipes } from "@features/recipes/types"
import { useFormContext } from "react-hook-form"

interface RecipeServingsProps {
    servings: Recipes["servings"]
}

export default function RecipeServings({servings}: RecipeServingsProps) {
    const [selectedServings, setSelectedServings] = useState<number>(servings)

    const { setValue, formState: {errors} } = useFormContext()
    
    const handleChangeServings = (s: number) => {
        setSelectedServings(s)
        setValue("servings", s, { shouldValidate: true })
    }

    useEffect(() => {
        setSelectedServings(servings)
    }, [servings])

    return (
        <>
        <label htmlFor="servings" className="text-text-secondary text-sm">Servings</label>
        <select value={selectedServings} onChange={(e) => handleChangeServings(Number(e.target.value))} name="servings" id="servings" className="bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 border-border px-4 py-1">
            {
                Array.from({ length: 21 }).map((_, i) => {
                    if (i !== 0) return <option key={i} value={i}>{i}</option>
                })
            }
            { errors.servings && (
                <p className="text-red-600 text-xs mt-1">
                    {String(errors.servings.message)}
                </p>
            )}
        </select>
        </>
    )
}