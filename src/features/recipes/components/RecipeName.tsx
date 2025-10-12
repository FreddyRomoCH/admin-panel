import { useEffect, useState } from "react"
import type { Recipes } from "@features/recipes/types"
import { useFormContext } from "react-hook-form"

interface RecipeNameProps {
    title: Recipes["title"]
}

export default function RecipeName({ title }: RecipeNameProps) {
    const [selectedTitle, setSelectedTitle] = useState<Recipes["title"]>(title)

    const { setValue, formState: {errors} } = useFormContext()
    
    const handleChangeTitle = (t: Recipes["title"]) => {
        setSelectedTitle(t)
        setValue("title", t, { shouldValidate: true })
    }

    useEffect(() => {
        setSelectedTitle(title)
    }, [title])

    return (
        <>
            <label htmlFor="title" className="text-text-secondary text-sm">Name</label>
            <input className={`bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 ${errors.title ? "border-red-600" : "border-border"} px-4 py-1`} id="title" type="text" value={selectedTitle} onChange={(e) => handleChangeTitle(e.target.value)} />

            {errors.title && (
                <p className="text-red-600 text-xs mt-1">
                    {String(errors.title.message)}
                </p>
            )}
        </>
    )
}