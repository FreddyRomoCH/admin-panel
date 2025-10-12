import { useState } from "react"
import type { Recipes } from "../types"

interface RecipeServingsProps {
    servings: Recipes["servings"]
}

export default function RecipeServings({servings}: RecipeServingsProps) {
    const [selectedServings, setSelectedServings] = useState<number>(servings)
    
    const handleChangeServings = (s: number) => {
        setSelectedServings(s)
    }

    return (
        <>
        <label htmlFor="servings" className="text-text-secondary text-sm">Servings</label>
        <select value={selectedServings} onChange={(e) => handleChangeServings(Number(e.target.value))} name="servings" id="servings" className="bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 border-border px-4 py-1">
            {
                Array.from({ length: 21 }).map((_, i) => {
                    if (i !== 0) return <option key={i} value={i}>{i}</option>
                })
            }
        </select>
        </>
    )
}