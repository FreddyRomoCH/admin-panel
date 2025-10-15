import { useLocation } from "react-router-dom"
import { sidebarNavs } from "@layouts/AppLayout/constants/sidebarNavs";
import ModalAddClient from "@/features/clients/components/ModalAddClient"
import IconPlus from "@/assets/IconPlus";
import Button from "@/components/ui/Button";
import { useState } from "react";

export default function Header() {
    const location = useLocation();
    const currentLocation = sidebarNavs.find((item) => item.path === location.pathname)
    const title = currentLocation ? currentLocation.label : "Freddy Panel"
    const [isOpen, setIsOpen] = useState(false)

    const handleOpenModal = () => {
        setIsOpen(true)
    }

    const handleCloseModal = () => {
        setIsOpen(false)
    }

    return (
        <div className="flex justify-between items-center py-8">
            <h1 className="font-inter text-3xl font-bold text-foreground-light">{title}</h1>
            <div className="flex justify-center items-center gap-10">
                {
                    title === "Recipes" && (
                        <Button 
                            title="Add Recipes" 
                            titleCss="text-card text-sm" 
                            icon={IconPlus} 
                            href="https://recipes.freddyromo.dev/add-recipe" 
                            target="_blank" 
                            iconCss="text-card w-5 h-5"
                            buttonCss="animate-sway flex justify-center items-center gap-2 bg-primary px-4 py-2 rounded-2xl cursor-pointer hover:scale-105 transform transition-transform duration-150 ease-in-out"
                        />
                    )
                }

                {
                    title === "Clients" && (
                        <Button 
                            type="button"
                            title="Add Client"
                            titleCss="text-card text-sm" 
                            icon={IconPlus}
                            iconCss="text-card w-5 h-5"
                            buttonCss="animate-sway flex justify-center items-center gap-2 bg-primary px-4 py-2 rounded-2xl cursor-pointer hover:scale-105 transform transition-transform duration-150 ease-in-out"
                            handleClick={handleOpenModal}
                        />
                    )
                }
                <img className="rounded-full h-12 w-12 object-cover drop-shadow-lg drop-shadow-black/50" src="/images/Freddy_pequeno.jpeg" alt="Admin Profile Image" />
            </div>

            {
                isOpen && (
                    <ModalAddClient 
                        handleOnClose={handleCloseModal}
                        isOpen={isOpen}
                    />
                )
            }
        </div>
    )
}