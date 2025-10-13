import IconPlus from "@/assets/IconPlus"
import IconClose from "@/assets/icons/IconClose"
import { useEffect, useRef, useState } from "react"
import { useFormContext } from "react-hook-form"

interface RecipeInstructionsProps {
    instructions: string[]
}

export default function RecipeInstructions({ instructions }:RecipeInstructionsProps) {
    const [instructionsList, setInstructionsList] = useState<string[]>(instructions)
    const { setValue, formState: { errors } } = useFormContext()
    const itemsRefs = useRef<(HTMLInputElement | null)[]>([])
    const hasMounted = useRef<boolean>(false)
    const [isLastStepEmpty, setisLastStepEmpty] = useState<boolean>(false)
    const dragItem = useRef<number | null>(null)

    useEffect(() => {
        setInstructionsList(instructions)
    }, instructions)

    const handleChangeInstruction = (step: number, inst: string) => {
        setisLastStepEmpty(false)
        const updated = [...instructionsList]
        updated[step] = inst
        setInstructionsList(updated)
        setValue("instructions", updated, { shouldValidate: true })
    }

    const handleClickClose = (step: number) => {
        const updated = instructionsList.filter((_, i) => i !== step)
        setInstructionsList(updated)
        setValue("instructions", updated, { shouldValidate: true })
    }

    const handleMoreSteps = () => {
        // setisLastStepEmpty(instructionsList[instructionsList.length - 1] === "")

        if (instructionsList.at(-1) === "") {
            const lastInput = itemsRefs.current.length - 1
            setisLastStepEmpty(true)
            itemsRefs.current[lastInput]?.focus()
        }else{
            const updated = [...instructionsList, ""]
            setInstructionsList(updated)
            setValue("instructions", updated, { shouldValidate: true })
        }
    }

    useEffect(() => {
        const lastInput = itemsRefs.current.length - 1

        !hasMounted.current
            ? hasMounted.current = true
            : itemsRefs.current[lastInput]?.focus()

    }, [instructionsList])

    return (
        <>
            <label className="text-sm text-text-secondary">Instructions</label>
            {
                instructionsList && instructionsList.map((instruction, index) => {
                    const step = index + 1

                    return (
                        <div key={step} className="flex justify-between items-center gap-2 mb-2">
                            <label className="text-xs text-text-secondary w-16" htmlFor={`instruction-${step}`}>{`Step ${step}`}</label>
                            <input ref={el => {itemsRefs.current[index] = el}} id={`instruction-${step}`} className={`bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 ${errors.intructions ? "text-red-600" : "border-border"} px-4 py-1`} type="text" value={instruction} onChange={(e) => handleChangeInstruction(index, e.target.value)} />
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

            {errors.instructions && (
                <p className="text-red-600 text-sm mt-1">
                    {String(errors.instructions.message)}
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