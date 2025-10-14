import ModalAddClient from "@/features/clients/components/ModalAddClient"
import { useState } from "react"

interface ButtonProps {
    title: string
    icon: React.ElementType
    href?: string
    target?: string
}

export default function Button ({ title, icon: Icon, href, target }: ButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    
    const handleOpenModal = () => {
        setIsOpen(true)
    }

    const handleCloseModal = () => {
        setIsOpen(false)
    }

    const iconCss = "text-card w-5 h-5"
    const titleCss = "text-card text-sm"
    const buttonCss = "animate-sway flex justify-center items-center gap-2 bg-primary px-4 py-2 rounded-2xl cursor-pointer hover:scale-105 transform transition-transform duration-150 ease-in-out"

    return (
        href 
            ? 
                <a href={href} target={target} rel="noopener noreferrer" className={buttonCss}>
                    {Icon && <Icon className={iconCss} />}
                    <span className={titleCss}>{ title }</span>
                </a>
            :
                <>
                    <button className={buttonCss} onClick={handleOpenModal}>
                        {Icon && <Icon className={iconCss} />}
                        <span className={titleCss}>{ title }</span>
                    </button>

                    {
                        isOpen && (
                            <ModalAddClient 
                                handleOnClose={handleCloseModal}
                                isOpen={isOpen}
                            />
                        )
                    }
                </>
    )
}