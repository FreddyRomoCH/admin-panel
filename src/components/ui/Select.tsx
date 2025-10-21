import type { Option } from "@/types/ui"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"

interface SelectProps {
    title?: string
    name: string
    id: string
    validation?: string
    options: Option[],
    labelClass?: string,
    selectClass?: string
    optionClass?: string
    value: string
    client_id?: number
    handleChangeOut?: (val: string, draft: string, clientId?: number) => void
}

export default function Select({ 
        title, 
        name, 
        id, 
        validation, 
        options, 
        labelClass, 
        selectClass, 
        optionClass, 
        value, 
        handleChangeOut, 
        client_id 
    }: SelectProps) {

    const form = useFormContext()
    const setValue = form?.setValue
    const errors = form?.formState?.errors

    const [selectedValue, setSelectedValue] = useState(value || "")

    const handleChangeValue = (val: string, draft: string) => {
        setSelectedValue(val)

        if (validation && setValue) {
            setValue(validation, val, { shouldValidate: true })
        }else{
            handleChangeOut?.(val, draft, client_id)
        }
    }

    useEffect(() => {
        setSelectedValue(value)
    }, [value])

    return (
        <>
            { title && 
                <label 
                    htmlFor={id} 
                    className={labelClass ??  ""}
                >
                    { title }
                </label> 
            }
            
            <select 
                value={selectedValue} 
                name={name} 
                id={id} 
                className={`
                    ${selectClass ?? ""}
                    ${validation && errors?.[validation] && "border-red-600"}
                `} 
                onChange={(e) => handleChangeValue(e.target.value, selectedValue)}>
                {
                    options.map((option: Option) => (
                        <option 
                            key={option.value} 
                            value={option.value} 
                            className={optionClass ?? ""}>
                                { option.label }
                        </option>
                    ))
                }
            </select>

            { validation && errors?.[validation] && (
                    <p className="text-red-600 text-xs mt-1">
                        {String(errors[validation].message)}
                    </p>
                )
            }
        </>
    )
}