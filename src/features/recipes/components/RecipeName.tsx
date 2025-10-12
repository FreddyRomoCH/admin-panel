import { useState } from "react"
import type { Recipes } from "@features/recipes/types"

interface RecipeNameProps {
    title: Recipes["title"]
}

export default function RecipeName({ title }: RecipeNameProps) {
    const [selectedTitle, setSelectedTitle] = useState<Recipes["title"]>(title)
    
    const handleChangeTitle = (t: Recipes["title"]) => {
        setSelectedTitle(t)
    }

    return (
        <>
            <label htmlFor="title" className="text-text-secondary text-sm">Name</label>
            <input className="bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 border-border px-4 py-1" id="title" type="text" value={selectedTitle} onChange={(e) => handleChangeTitle(e.target.value)} />
        </>
    )
}