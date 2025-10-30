import { useEffect, useState } from "react"
import type { Recipes } from "@features/recipes/types"
import { useFormContext } from "react-hook-form"

interface RecipeDescriptionProps {
    description: Recipes["description"]
}

export default function RecipeDescription({ 
        description, 
    }: RecipeDescriptionProps) {
    const [selectedDescription, setSelectedDescription] = useState<Recipes["description"]>(description)

    const { setValue, formState: {errors} } = useFormContext()
    
    const handleChangeDescription = (d: Recipes["description"]) => {
        setSelectedDescription(d)
        setValue("description", d, { shouldValidate: true })
    }

    useEffect(() => {
        setSelectedDescription(description)
    }, [description])

    return (
        <>
            <label htmlFor="description" className="text-text-secondary dark:text-text-secondary-dark text-sm">Description</label>
            <textarea 
                value={selectedDescription} 
                onChange={(e) => handleChangeDescription(e.target.value)} 
                name="description" 
                id="description" 
                className={`bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 px-4 py-1 field-sizing-content min-h-28
                    ${errors.description 
                        ? "border-red-600" 
                        : "border-border"} 
                    `} 
                />

            {errors.description && (
                <p className="text-red-600 text-xs mt-1">
                    {String(errors.description.message)}
                </p>
            )}
        </>
    )
}