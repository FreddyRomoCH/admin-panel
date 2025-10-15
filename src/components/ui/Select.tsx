import type { Option } from "@/types/ui"
import { useState } from "react"
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
}

export default function Select({ title, name, id, validation, options, labelClass, selectClass, optionClass, value }: SelectProps) {
    const form = useFormContext()
    const setValue = form?.setValue
    const errors = form?.formState?.errors

    const [selectedValue, setSelectedValue] = useState(value ? value : "")

    const selectedOption = options.find(opt => opt.value === selectedValue)

    const handleChangeValue = (val: string) => {
        setSelectedValue(val)

        if (validation && setValue) {
            setValue(validation, val, { shouldValidate: true })
        }
    }

    return (
        <>
            { title && <label htmlFor={id} className={labelClass ? labelClass : ""}>{ title }</label> }
            
            <select 
                value={selectedValue} 
                name={name} id={id} 
                className={`
                    ${selectClass ?? ""} 
                    ${selectedOption?.bg ?? ""}
                    ${selectedOption?.text ?? ""}
                    ${validation && errors?.[validation] && "border-red-600"}
                `} 
                onChange={(e) => handleChangeValue(e.target.value)}>
                {
                    options.map((option: Option) => (
                        <option 
                            key={option.value} 
                            value={option.value} 
                            className={optionClass ? optionClass : ""}>
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