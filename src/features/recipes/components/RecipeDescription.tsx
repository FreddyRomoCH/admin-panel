import { useState } from "react"
import type { Recipes } from "@features/recipes/types"

interface RecipeDescriptionProps {
    description: Recipes["description"]
}

export default function RecipeDescription({ description }: RecipeDescriptionProps) {
    const [selectedDescription, setSelectedDescription] = useState<Recipes["description"]>(description)
    
    const handleChangeDescription = (d: Recipes["description"]) => {
        setSelectedDescription(d)
    }

    return (
        <>
        <label htmlFor="description" className="text-text-secondary text-sm">Description</label>
        <textarea value={selectedDescription} onChange={(e) => handleChangeDescription(e.target.value)} name="description" id="description" className="bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 border-border px-4 py-1 field-sizing-content min-h-28" />
        </>
    )
}