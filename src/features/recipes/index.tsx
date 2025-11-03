import { useEffect, useRef, useState } from "react"
import type { Recipes } from "@features/recipes/types"
import TableRecipes from "@features/recipes/components/TableRecipes"
import ModalEditRecipes from "@features/recipes/components/ModalEditRecipes"
import { useRecipesStore } from "@/store/useRecipesStore"
import Error from "@/components/shared/Error"
import Loading from "@/components/shared/Loading"
import ModalConfirmation from "@features/clients/components/ModalConfirmation"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

export default function Recipes() {
    const [isOpen, setIsOpen] = useState(false)
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
    const [selectedRecipe, setSelectedRecipe] = useState<Recipes | null>(null)
    const [newStatus, setNewStatus] = useState<string>("")
    const [prevStatus, setPrevStatus] = useState<string>("")
    const { recipes, loading, error, fetchRecipes, deleteRecipe, recipeStatus} = useRecipesStore()
    const isChangingActiveRecipe = useRef(false)
    const { t } = useTranslation()

    const handleOpenModal = (recipe: Recipes) => {
        setIsOpen(true)
        setSelectedRecipe(recipe)
    }

    const handleOnClose = () => {
        setIsOpen(false)
        setIsConfirmationOpen(false)
        setSelectedRecipe(null)

        if (isChangingActiveRecipe.current) {
            setNewStatus(prevStatus)
        }
        if ( newStatus === "no") {
            setNewStatus("yes")
            isChangingActiveRecipe.current = false
        }
    }

    const handleOpenOnDelete = (recipe: Recipes) => {
        setIsConfirmationOpen(true)
        setSelectedRecipe(recipe)
    }

    const handleOnDelete = async () => {
        setIsConfirmationOpen(false)
        const success = await deleteRecipe(selectedRecipe?.id)

        if (!success) {
            toast.error(`${t("Unable to delete the recipe. Try again later")}`, {
                style: {
                    background: '#ffe2e3',
                    color: '#475569',
                    fontSize: '14px'
                }
            })
        } else {
            toast.success(`${selectedRecipe?.title} ${t("deleted successfully")}!`, {
                style: {
                    background: "#defae6",
                    color: "#475569",
                    fontSize: "14px",
                },
            })
        }
    }

    const handleChangeActiveRecipe = (val: string, recipe: Recipes) => {
        isChangingActiveRecipe.current = true
        setSelectedRecipe(recipe)
        setPrevStatus(recipe.is_active ? "yes" : "no")
        setNewStatus(val)
        setIsConfirmationOpen(true)
    }

    const handleChangeStatusRecipe = async () => {
        setIsConfirmationOpen(false)
        const success = await recipeStatus(newStatus, selectedRecipe?.id)
        isChangingActiveRecipe.current = false

        if (!success) {
            toast.error(`${t("Unable to change status. Try again later")}`, {
                style: {
                    background: '#ffe2e3',
                    color: '#475569',
                    fontSize: '14px'
                }
            })
        } else {
            toast.success(`${selectedRecipe?.title} ${t("status changed successfully")}!`, {
                style: {
                    background: "#defae6",
                    color: "#475569",
                    fontSize: "14px",
                },
            })
        }
    }

    useEffect(() => {
        fetchRecipes()
    }, [])

    if (error && !selectedRecipe) return <Error type="page" />

    if (loading) 
            return <Loading direction="cols" length={4} />

    return (
        <main className="flex flex-col justify-center items-center">
            <div className="overflow-y-auto max-h-[calc(80vh)] w-full scrollbar-thin scrollbar-thumb-primary scrollbar-track-background-light">
                <table className="w-full border-collapse text-sm tracking-wide font-light animate-blurred-fade-in">
                    <thead className="bg-background-light dark:bg-background-dark shadow rounded-t-2xl text-text-secondary dark:text-text-secondary-dark">
                        <tr>
                            <th className="px-4 py-2 text-left">{t("Image")}</th>
                            <th className="px-4 py-2 text-left">{t("Title")}</th>
                            <th className="px-4 py-2 text-left">{t("Category")}</th>
                            <th className="px-4 py-2 text-left">{t("Edit")}</th>
                            <th className="px-4 py-2 text-left">{t("Delete")}</th>
                            <th className="px-4 py-2 text-left">{t("Active")}</th>
                        </tr>
                    </thead>

                    <tbody className="bg-card dark:bg-card-dark text-text-primary dark:text-text-secondary-dark font-inter">
                        <TableRecipes 
                            recipes={recipes} 
                            onDelete={handleOpenOnDelete}
                            onEdit={handleOpenModal} 
                            handleChangeActiveRecipe={(val, recipe) => handleChangeActiveRecipe(val, recipe)}
                            currentStatus={
                                selectedRecipe
                                    ? {id: selectedRecipe.id, value: newStatus}
                                    : null
                            }
                        />
                    </tbody>
                </table>
            </div>

            {isOpen && selectedRecipe && (
                <ModalEditRecipes 
                    isOpen={isOpen} 
                    handleOnClose={handleOnClose} 
                    recipe={selectedRecipe} 
                    mode="edit"
                />
            )}

            {isConfirmationOpen && (
                <ModalConfirmation 
                    isOpen={isConfirmationOpen}
                    onConfirm={isChangingActiveRecipe.current 
                        ? handleChangeStatusRecipe
                        : handleOnDelete
                    }
                    onCancel={handleOnClose}
                    mode={isChangingActiveRecipe.current 
                        ? "status" 
                        : "delete"
                    }
                    section="recipes"
                    recipeID={selectedRecipe?.id}
                />
            )}
        </main>
    )
}