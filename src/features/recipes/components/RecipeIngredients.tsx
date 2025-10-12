import IconClose from "@/assets/icons/IconClose"
import { useEffect, useState } from "react"


interface RecipeIngredientsProps {
    ingredients: string[]
}

export default function RecipeIngredients({ ingredients }:RecipeIngredientsProps) {
    const [ingredientsList, setIngredientsList] = useState<string[]>(ingredients)

    useEffect(() => {
        setIngredientsList(ingredients)
    }, ingredients)

    const handleChangeIngredient = (step: number, ingre: string) => {
        const updated = [...ingredientsList]
        updated[step] = ingre
        setIngredientsList(updated)
    }

    const handleClickClose = (step: number) => {
        const updated = ingredientsList.filter((_, i) => i !== step)
        setIngredientsList(updated)
    }

    return (
        <>
            <label className="text-sm text-text-secondary">Ingredients</label>
            {
                ingredientsList && ingredientsList.map((ingredient, index) => {
                    const step = index + 1

                    return (
                        <div key={step} className="flex justify-between items-center gap-2 mb-2">
                            <label className="text-xs text-text-secondary w-16" htmlFor={`ingredient-${step}`}>{`Step ${step}`}</label>
                            <input id={`ingredient-${step}`} className="bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 border-border px-4 py-1" type="text" value={ingredient} onChange={(e) => handleChangeIngredient(index, e.target.value)} />
                            <button type="button" onClick={() => handleClickClose(index)}>
                                <IconClose className="text-primary w-8 h-8 cursor-pointer" />
                            </button>
                        </div>
                    )
                })
            }
        </>
    )
}