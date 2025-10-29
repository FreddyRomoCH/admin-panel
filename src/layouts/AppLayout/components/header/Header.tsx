import { useLocation } from "react-router-dom"
import { sidebarNavs } from "@layouts/AppLayout/constants/sidebarNavs";
import IconPlus from "@/assets/IconPlus";
import Button from "@/components/ui/Button";
import { useState } from "react";
import ModalClientForm from "@/features/clients/components/ModalClientForm";
import ModalEditRecipes from "@/features/recipes/components/ModalEditRecipes";

export default function Header() {
    const location = useLocation();
    const currentLocation = sidebarNavs.find((item) => item.path === location.pathname)
    const title = currentLocation ? currentLocation.label : "Freddy Panel"
    const [isClientModalOpen, setIsClientModalOpen] = useState(false)
    const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false)

    const handleOpenModal = (mode: "edit" | "create") => {
        if (mode === "edit") {
            setIsClientModalOpen(true)
        }

        if (mode === "create") {
            setIsRecipeModalOpen(true)
        }
    }

    const handleCloseModal = (mode: "edit" | "create") => {
        if (mode === "edit") {
            setIsClientModalOpen(false)
        }

        if (mode === "create") {
            setIsRecipeModalOpen(false)
        }
    }

    const avatar = `https://unavatar.io/github/FreddyRomoCH`

    return (
        <div className="flex justify-between items-center py-8">
            <h1 className="font-inter text-3xl font-bold text-foreground-light">{title}</h1>
            <div className="flex justify-center items-center gap-10">
                {
                    title === "Recipes" && (
                        <Button 
                            type="button"
                            title="Add Recipes" 
                            titleCss="text-card text-sm" 
                            icon={IconPlus} 
                            // href="https://recipes.freddyromo.dev/add-recipe" 
                            target="_blank" 
                            iconCss="text-card w-5 h-5"
                            buttonCss="animate-sway flex justify-center items-center gap-2 bg-primary px-4 py-2 rounded-2xl cursor-pointer hover:scale-105 transform transition-transform duration-150 ease-in-out"
                            handleClick={() => handleOpenModal("create")}
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
                            handleClick={() => handleOpenModal("edit")}
                        />
                    )
                }
                <img className="rounded-full h-12 w-12 object-cover drop-shadow-lg drop-shadow-black/50" src={avatar} alt="Admin Profile Image" />
            </div>

            {
                isClientModalOpen && (
                    <ModalClientForm 
                        handleOnClose={() => handleCloseModal("edit")}
                        isOpen={isClientModalOpen}
                        mode="create"
                    />
                )
            }

            {
                isRecipeModalOpen && (
                    <ModalEditRecipes 
                        isOpen={isRecipeModalOpen} 
                        handleOnClose={() => handleCloseModal("create")}
                        mode="create"
                    />
                )
            }
        </div>
    )
}