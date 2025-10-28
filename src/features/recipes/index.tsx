import { useEffect, useState } from "react"
import type { Recipes } from "@features/recipes/types"
import Skeleton from "@/components/ui/Skeleton"
import TableRecipes from "@features/recipes/components/TableRecipes"
import ModalEditRecipes from "@features/recipes/components/ModalEditRecipes"
import { useRecipesStore } from "@/store/useRecipesStore"
import Error from "@/components/shared/Error"

export default function Recipes() {
    // const {loading, error, recipes} = useRecipes()
    const [isOpen, setIsOpen] = useState(false)
    const [selectedRecipe, setSelectedRecipe] = useState<Recipes | null>(null)
    const { recipes, loading, error, fetchRecipes } = useRecipesStore()

    const handleOpenModal = (recipe: Recipes) => {
        setIsOpen(true)
        setSelectedRecipe(recipe)
    }

    const handleOnClose = () => {
        setIsOpen(false)
        setSelectedRecipe(null)
    }

    useEffect(() => {
        fetchRecipes()
    }, [])


    if (error) return <Error type="page" />

    if (loading) {
        return (
            <main className="flex justify-center items-center gap-2">
                {
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i}><Skeleton /></div>
                    ))
                }
            </main>
        )
    } 

    return (
        <main className="flex flex-col justify-center items-center">
            <table className="w-full border-collapse text-sm tracking-wide font-light">
                <thead className="bg-background-light shadow rounded-t-2xl text-text-secondary">
                    <tr>
                        <th className="px-4 py-2 text-left">Image</th>
                        <th className="px-4 py-2 text-left">Title</th>
                        <th className="px-4 py-2 text-left">Category</th>
                        <th className="px-4 py-2 text-left">Edit</th>
                    </tr>
                </thead>

                <tbody className="bg-card text-text-primary font-inter">
                    <TableRecipes 
                        recipes={recipes} 
                        onEdit={handleOpenModal} 
                    />
                </tbody>
            </table>

            {isOpen && selectedRecipe && (
                <ModalEditRecipes 
                    isOpen={isOpen} 
                    handleOnClose={handleOnClose} 
                    recipe={selectedRecipe} 
                    mode="edit"
                />
            )}
        </main>
    )
}