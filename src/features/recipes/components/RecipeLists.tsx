import IconPlus from "@/assets/IconPlus"
import IconClose from "@/assets/icons/IconClose"
import { useEffect, useRef, useState } from "react"
import { useFormContext } from "react-hook-form"

interface RecipeListsProps {
    list: string[],
    toValidate: string
}

export default function RecipeLists({ list, toValidate }:RecipeListsProps) {
    const [recipelist, setRecipeList] = useState<string[]>(list)
    const { setValue, formState: { errors } } = useFormContext()
    const itemsRefs = useRef<(HTMLInputElement | null)[]>([])
    const hasMounted = useRef<boolean>(false)
    const [isLastStepEmpty, setisLastStepEmpty] = useState<boolean>(false)
    const dragItem = useRef<number | null>(null)
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null)

    useEffect(() => {
        if (recipelist.length === 0 && list.length > 0 ) {
            setRecipeList(list)
        }
    }, list)

    const handleChangeList = (step: number, inst: string) => {
        setisLastStepEmpty(false)
        const updated = [...recipelist]
        updated[step] = inst
        setRecipeList(updated)
        setValue(toValidate, updated, { shouldValidate: true })
    }

    const handleClickClose = (step: number) => {
        const updated = recipelist.filter((_, i) => i !== step)
        setRecipeList(updated)
        setValue(toValidate, updated, { shouldValidate: true })
    }

    const handleMoreSteps = () => {
        if (recipelist.at(-1) === "") {
            const lastInput = itemsRefs.current.length - 1
            setisLastStepEmpty(true)
            itemsRefs.current[lastInput]?.focus()
        }else{
            const updated = [...recipelist, ""]
            setRecipeList(updated)
            setValue(toValidate, updated, { shouldValidate: true })
        }
    }

    useEffect(() => {
        const lastInput = itemsRefs.current.length - 1

        if (lastInput > 0 && !hasMounted.current) {
            hasMounted.current = true
            
        } else {
            itemsRefs.current[lastInput]?.focus()
        }

    }, [recipelist])

    const handleDrop = (targetIndex: number) => {
        if (dragItem.current === null) return
        const newList = [...recipelist]
        const [movedItem] = newList.splice(dragItem.current, 1)
        newList.splice(targetIndex, 0, movedItem)
        dragItem.current = null
        setRecipeList(newList)
        setValue("ingredients", newList, { shouldValidate: true })
    }

    return (
        <>
            <label className="text-sm text-text-secondary dark:text-text-secondary-dark">{toValidate.charAt(0).toUpperCase() + toValidate.slice(1)}</label>
            {
                recipelist && recipelist.map((listItem, index) => {
                    const step = index + 1

                    return (
                        <div 
                            key={step} 
                            className={`flex justify-between items-center gap-2 mb-2 rounded-md transition-all duration-200 cursor-grab 
                                ${draggingIndex === index 
                                    ? "opacity-50 scale-[0.98]" 
                                    : "opacity-100 scale-100"
                                }
                            `}
                            draggable
                            onDragStart={() => {
                                dragItem.current = index
                                setDraggingIndex(index)
                            }}
                            onDragEnd={() => setDraggingIndex(null)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleDrop(index)}
                        >
                            <label 
                                className="text-xs text-text-secondary dark:text-text-secondary-dark w-16" 
                                htmlFor={`instruction-${step}`}>
                                    {`Step ${step}`}
                            </label>
                            <input 
                                ref={el => {itemsRefs.current[index] = el}} 
                                id={`instruction-${step}`} 
                                className={`bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 
                                    ${errors[toValidate] 
                                        ? "text-red-600" 
                                        : "border-border"
                                    } px-4 py-1`} 
                                type="text" 
                                value={listItem}
                                onChange={(e) => handleChangeList(index, e.target.value)} 
                            />
                            <button 
                                type="button" 
                                onClick={() => handleClickClose(index)}
                            >
                                <IconClose className="text-primary w-8 h-8 cursor-pointer" />
                            </button>
                        </div>
                    )
                })
            }
            
            {/* Agregar botón para "Add more Steps" */}
            <div className="flex justify-end">
                <button 
                    onClick={handleMoreSteps} 
                    type="button" 
                    className="flex justify-center items-center bg-background-light rounded-2xl text-text-primary px-3 py-2 text-sm cursor-pointer"
                >
                    <IconPlus className="w-6 h-6 text-text-primary" />
                    <span>Add Step</span>
                </button>
            </div>

            {(errors[toValidate] || recipelist.length < 1) && (
                <p className="text-red-600 text-sm mt-1">
                    {String(errors[toValidate]?.message || "You must select at least one item")}
                </p>
            )}

            {isLastStepEmpty && (
                <p className="text-red-600 text-sm mt-1">
                    Plese fill the last step first
                </p>
            )}
        </>
    )
}