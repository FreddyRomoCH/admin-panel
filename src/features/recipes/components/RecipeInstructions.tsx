import IconClose from "@/assets/icons/IconClose"
import { useEffect, useState } from "react"

interface RecipeInstructionsProps {
    instructions: string[]
}

export default function RecipeInstructions({ instructions }:RecipeInstructionsProps) {
    const [instructionsList, setInstructionsList] = useState<string[]>(instructions)

    useEffect(() => {
        setInstructionsList(instructions)
    }, instructions)

    const handleChangeInstruction = (step: number, inst: string) => {
        const updated = [...instructionsList]
        updated[step] = inst
        setInstructionsList(updated)
    }

    const handleClickClose = (step: number) => {
        const updated = instructionsList.filter((_, i) => i !== step)
        setInstructionsList(updated)
    }

    return (
        <>
            <label className="text-sm text-text-secondary">Instructions</label>
            {
                instructionsList && instructionsList.map((instruction, index) => {
                    const step = index + 1

                    return (
                        <div key={step} className="flex justify-between items-center gap-2 mb-2">
                            <label className="text-xs text-text-secondary w-16" htmlFor={`instruction-${step}`}>{`Step ${step}`}</label>
                            <input id={`instruction-${step}`} className="bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 border-border px-4 py-1" type="text" value={instruction} onChange={(e) => handleChangeInstruction(index, e.target.value)} />
                            <div onClick={() => handleClickClose(index)}>
                                <IconClose className="text-primary w-8 h-8 cursor-pointer" />
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}