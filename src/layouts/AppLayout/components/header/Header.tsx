import { useLocation } from "react-router-dom"
import { sidebarNavs } from "@layouts/AppLayout/constants/sidebarNavs";
import IconPlus from "@/assets/IconPlus";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import ModalClientForm from "@/features/clients/components/ModalClientForm";
import ModalEditRecipes from "@/features/recipes/components/ModalEditRecipes";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store/useAuthStore";
import { useMediaQuery } from "react-responsive";
import IconMenuOpen from "@/assets/icons/IconMenuOpen";

interface HeaderProps {
    handleOnCLick: () => void
}

export default function Header({ handleOnCLick }: HeaderProps) {
    const location = useLocation();
    const currentLocation = sidebarNavs.find((item) => item.path === location.pathname)
    const title = currentLocation ? currentLocation.label : "Settings"
    const { user, signOut } = useAuthStore()
    const [isClientModalOpen, setIsClientModalOpen] = useState(false)
    const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false)
    const [avatar, setAvatar] = useState(user?.avatar || "/images/avatar.png")
    const { t } = useTranslation()
    const isDesktop = useMediaQuery({ minWidth: 768 });

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

    useEffect(() => {
        setAvatar(user?.avatar || "/images/avatar.png") 
    }, [user?.avatar])

    return (
        <div className="flex flex-col-reverse md:flex-row justify-between items-center py-8">

            <div>
                <h1 
                    className="font-inter text-2xl md:text-3xl font-bold text-text-primary dark:text-card text-center md:text-left">
                    { t(title) }
                </h1>

                { 
                    !isDesktop && (
                        title === "Recipes" && (
                            <Button 
                                type="button"
                                title="Add Recipes" 
                                titleCss="text-card text-sm" 
                                icon={IconPlus}
                                target="_blank" 
                                iconCss="text-card w-5 h-5"
                                buttonCss="animate-sway flex justify-center items-center gap-2 bg-primary px-4 py-2 rounded-2xl cursor-pointer hover:scale-105 transform transition-transform duration-150 ease-in-out mt-4"
                                handleClick={() => handleOpenModal("create")}
                            />
                        )
                    )
                }

                {
                    !isDesktop && (
                        title === "Clients" && (
                            <Button 
                                type="button"
                                title="Add Client"
                                titleCss="text-card text-sm" 
                                icon={IconPlus}
                                iconCss="text-card w-5 h-5"
                                buttonCss="animate-sway flex justify-center items-center gap-2 bg-primary px-4 py-2 rounded-2xl cursor-pointer hover:scale-105 transform transition-transform duration-150 ease-in-out mt-4"
                                handleClick={() => handleOpenModal("edit")}
                            />
                        )
                    )
                }
            </div>

            <div className="flex justify-center items-center gap-10 mb-6 md:mb-0">
            
                {!isDesktop && (
                    <div onClick={handleOnCLick}>
                        <IconMenuOpen 
                            className="text-primary w-auto h-12"
                        />
                    </div>
                )}

                { 
                    isDesktop && (
                        title === "Recipes" && (
                            <Button 
                                type="button"
                                title="Add Recipes" 
                                titleCss="text-card text-sm" 
                                icon={IconPlus}
                                target="_blank" 
                                iconCss="text-card w-5 h-5"
                                buttonCss="animate-sway flex justify-center items-center gap-2 bg-primary px-4 py-2 rounded-2xl cursor-pointer hover:scale-105 transform transition-transform duration-150 ease-in-out"
                                handleClick={() => handleOpenModal("create")}
                            />
                        )
                    )
                }

                {
                    isDesktop && (
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
                    )
                }

                {/* User's Avatar */}

                <Button 
                    title={t("Log Out")}
                    buttonCss="bg-primary px-4 py-2 rounded-2xl text-sm text-card hover:scale-105 transform transition-transform duration-150 ease-in-out cursor-pointer"
                    handleClick={signOut}
                />

                <img 
                    className="rounded-full h-12 w-12 object-cover drop-shadow-lg drop-shadow-black/50" 
                    src={avatar} 
                    alt="Avatar Image"
                />
                
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