import IconPlus from "@/assets/IconPlus"
import IconClose from "@/assets/icons/IconClose"
import { useEffect, useRef, useState } from "react"
import { useFormContext } from "react-hook-form"

interface RecipeIngredientsProps {
    ingredients: string[]
}

export default function RecipeIngredients({ ingredients }:RecipeIngredientsProps) {
    const [ingredientsList, setIngredientsList] = useState<string[]>(ingredients)
    const { setValue, formState: { errors } } = useFormContext()
    const itemRefs = useRef<(HTMLInputElement | null)[]>([])
    const hasMounted = useRef<boolean>(false)
    const [isLastStepEmpty, setisLastStepEmpty] = useState<boolean>(false)
    const dragItem = useRef<number | null>(null)

    const handleChangeIngredient = (step: number, ingre: string) => {
        setisLastStepEmpty(false)
        const updated = [...ingredientsList]
        updated[step] = ingre
        setIngredientsList(updated)
        setValue("ingredients", updated, { shouldValidate: true })
    }

    const handleClickClose = (step: number) => {
        const updated = ingredientsList.filter((_, i) => i !== step)
        setIngredientsList(updated)
        setValue("ingredients", updated, { shouldValidate: true })
    }

    const handleMoreSteps = () => {
        if (ingredientsList.at(-1) === "") {
            const lastInput = itemRefs.current.length - 1
            setisLastStepEmpty(true)
            itemRefs.current[lastInput]?.focus()
        }else{
            const updated = [...ingredientsList, ""]
            setIngredientsList(updated)
            setValue("ingredients", updated, { shouldValidate: true })
        }
    }

    useEffect(() => {
        setIngredientsList(ingredients)
    }, [ingredients])

    useEffect(() => {
        const lastInput = itemRefs.current.length - 1

        !hasMounted.current
            ? hasMounted.current = true
            : itemRefs.current[lastInput]?.focus()

    }, [ingredientsList])

    return (
        <>
            <label className="text-sm text-text-secondary">Ingredients</label>
            {
                ingredientsList && ingredientsList.map((ingredient, index) => {
                    const step = index + 1

                    return (
                        <div key={step} className="flex justify-between items-center gap-2 mb-2">
                            <label className="text-xs text-text-secondary w-16" htmlFor={`ingredient-${step}`}>{`Step ${step}`}</label>
                            <input ref={el => {itemRefs.current[index] = el}} id={`ingredient-${step}`} className={`bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 ${errors.ingredients ? "text-red-600" : "border-border"} px-4 py-1`} type="text" value={ingredient} onChange={(e) => handleChangeIngredient(index, e.target.value)} />
                            <button type="button" onClick={() => handleClickClose(index)}>
                                <IconClose className="text-primary w-8 h-8 cursor-pointer" />
                            </button>
                        </div>
                    )
                })
            }

            {/* Agregar botón para "Add more Steps" */}
            <div className="flex justify-end">
                <button onClick={handleMoreSteps} type="button" className="flex justify-center items-center bg-background-light rounded-2xl text-text-primary px-3 py-2 text-sm cursor-pointer">
                    <IconPlus className="w-6 h-6 text-text-primary" />
                    <span>Add Step</span>
                </button>
            </div>

            {errors.ingredients && (
                <p className="text-red-600 text-sm mt-1">
                    {String(errors.ingredients.message)}
                </p>
            )}

            {isLastStepEmpty && (
                <p className="text-red-600 text-sm mt-1">
                    Please fill the step first
                </p>
            )}
        </>
    )
}