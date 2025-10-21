import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"

interface InputProps {
    value?: string
    type: string
    title?: string
    id: string,
    validation: string
    labelClass?: string,
    inputClass?: string
}

export default function Input({ value, type, title, id, validation, labelClass, inputClass }: InputProps) {
    const [inputValue, setInputValue] = useState<string | undefined>(value)
    const { setValue, formState: { errors } } = useFormContext()

    const handleChange = (input: string) => {
        setInputValue(input)
        setValue(validation, input, { shouldValidate: true })
    }

    useEffect(() => {
        setInputValue(value)
    }, [value])
    
    return (
        <>
            { title && <label htmlFor={id} className={labelClass ? labelClass : ""}>{ title }</label> }
            <input 
                type={type} 
                id={id} 
                className={`${inputClass ? inputClass : ""} ${errors[validation] && "border-red-600"}`} 
                onChange={(e) => handleChange(e.target.value)} 
                value={inputValue} />

            {errors[validation] && (
                <p className="text-red-600 text-xs mt-1">
                    {String(errors[validation].message)}
                </p>
            )}
        </>
    )
}