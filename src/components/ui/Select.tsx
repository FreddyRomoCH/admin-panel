import ModalStatusChange from "@/features/clients/components/ModalStatusChange";
import type { Option } from "@/types/ui";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useClientsStore } from "@/store/useClientsStore";
import toast from "react-hot-toast";
// import { Toaster } from "react-hot-toast"

interface SelectProps {
    title?: string;
    name: string;
    id: string;
    validation?: string;
    options: Option[];
    labelClass?: string;
    selectClass?: string;
    optionClass?: string;
    value: string;
    client_id?: number | undefined
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
    client_id
}: SelectProps) {
    const form = useFormContext();
    const setValue = form?.setValue;
    const errors = form?.formState?.errors;

    const { changePaymentStatus, error: errorChangeStatus } = useClientsStore()
    const [selectedValue, setSelectedValue] = useState(value ? value : "");
    const [previousValue, setPreviousValue] = useState(value)
    const [selectedClientID, setSelectedClientID] = useState<number | undefined>(client_id)
    const [isOpen, setIsOpen] = useState(false)
    const hasStatusChanged = useRef(false)

    const selectedOption = options.find((opt) => opt.value === selectedValue);

    const handleChangeValue = (val: string, clientID: number | undefined) => {
        setSelectedValue(val);
        setPreviousValue(selectedValue)
        setSelectedClientID(clientID)

        if (validation && setValue) {
            setValue(validation, val, { shouldValidate: true });
        }

        // If there is a clientID, means the status wants to be changed.
        if (clientID) {
            hasStatusChanged.current = true
            setIsOpen(true)
        } 
    };

    const onConfirm = () => {
        // If confirmed, the changes to new value
        hasStatusChanged.current = false
        setIsOpen(false)
        changePaymentStatus(selectedClientID, selectedValue)
        if (!errorChangeStatus) {
            toast.success(`Status successfully changed to ${selectedValue}`, {
                style: {
                    background: 'oklch(0.96 0.04 155.41)'
                }
            })
        } else {
            toast.error('Status not changed! try again later.', {
                style: {
                    background: 'oklch(0.93 0.03 17.71)'
                }
            })
        }
    }

    const onCancel = () => {
        // If canceled, the old value stays
        setSelectedValue(previousValue)
        hasStatusChanged.current = false
        setIsOpen(false)
    }

    return (
        <>
        {title && (
            <label htmlFor={id} className={labelClass ? labelClass : ""}>
            {title}
            </label>
        )}

        <select
            value={selectedValue}
            name={name}
            id={id}
            className={`
                        ${selectClass ?? ""}
                        ${selectedOption?.bg ?? ""}
                        ${selectedOption?.text ?? ""}
                        ${validation && errors?.[validation] && "border-red-600"}
                    `}
            onChange={(e) => handleChangeValue(e.target.value, selectedClientID)}
        >
            {options.map((option: Option) => (
            <option
                key={option.value}
                value={option.value}
                className={optionClass ? optionClass : ""}
            >
                {option.label}
            </option>
            ))}
        </select>

        {validation && errors?.[validation] && (
            <p className="text-red-600 text-xs mt-1">
            {String(errors[validation].message)}
            </p>
        )}

        {/* Just to change status */}
        {hasStatusChanged.current && isOpen && (
            <ModalStatusChange 
                isOpen={isOpen}
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        )}
        </>
    );
}
