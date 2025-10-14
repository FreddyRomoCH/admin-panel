import type { Option } from "@/types/ui"
import { useState } from "react"
import { useFormContext } from "react-hook-form"

interface SelectProps {
    title?: string
    name: string
    id: string
    validation: string
    options: Option[],
    labelClass?: string,
    selectClass?: string
    optionClass?: string
}

export default function Select({ title, name, id, validation, options, labelClass, selectClass, optionClass }: SelectProps) {
    const [selectedValue, setSelectedValue] = useState("Pending")
    const {setValue, formState: {errors}} = useFormContext()

    const handleChangeValue = (val: string) => {
        setSelectedValue(val)
        setValue(validation, val, {shouldValidate: true})
    }
    
    return (
        <>
            { title && <label htmlFor={id} className={labelClass ? labelClass : ""}>{ title }</label> }
            
            <select 
                value={selectedValue} 
                name={name} id={id} 
                className={`${selectClass ? selectClass : ""} ${errors[validation] && "border-red-600"}`} 
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

            {errors[validation] && (
                <p className="text-red-600 text-xs mt-1">
                    {String(errors[validation].message)}
                </p>
            )}
        </>
    )
}