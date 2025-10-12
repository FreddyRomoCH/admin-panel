import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Recipes } from "@features/recipes/types"
import RecipeName from "@features/recipes/components/RecipeName"
import RecipeDescription from "@features/recipes/components/RecipeDescription"
import RecipeServings from "@features/recipes/components/RecipeServings"
import RecipePrepTime from "@features/recipes/components/RecipePrepTime"
import RecipeCountry from "@features/recipes/components/RecipeCountry"
import RecipeCategories from "@features/recipes/components/RecipeCategories"
import RecipeIngredients from "@features/recipes/components/RecipeIngredients"
import RecipeInstructions from "@features/recipes/components/RecipeInstructions"
import RecipeImage from "@features/recipes/components/RecipeImage"
import { recipeSchema } from "@features/recipes/lib/schema/recipe"

interface ModalEditRecipesProps {
    isOpen: boolean,
    handleOnClose: () => void,
    recipe: Recipes
}

export default function ModalEditRecipes({ isOpen, handleOnClose, recipe }: ModalEditRecipesProps) {
    const {title, description, main_image, servings, prep_time, country, recipe_categories, ingredients, instructions} = recipe
    const methods = useForm({
        resolver: zodResolver(recipeSchema),
        defaultValues: recipe
    })

    return (
        <Dialog open={isOpen} onClose={handleOnClose}>
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center">
                {/* <Button onClick={handleOnClose}>Close Recipe</Button> */}
                <DialogPanel className="max-w-3xl w-full max-h-4/5 bg-white rounded-2xl overflow-y-auto">
                    <header className="border-b-2 border-border p-6">
                        <DialogTitle className="text-lg font-semibold">Edit Recipe</DialogTitle>
                    </header>
                    <main className="py-6">
                        <FormProvider {...methods}>
                            <form action="">
                                <section className="flex justify-between items-start gap-4 mb-4 px-4">
                                    <RecipeImage mainImage={main_image} title={title} />

                                    <div className="flex flex-col justify-start items-left gap-4 w-full">
                                        <div>
                                            <RecipeName title={title} />
                                        </div>
                                        <div>
                                            <RecipeDescription description={description} />
                                        </div>
                                    </div>
                                </section>

                                <section className="grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-4 mb-4 px-4">
                                    <div>
                                        <RecipeServings servings={servings} />
                                    </div>

                                    <div>
                                        <RecipePrepTime prep_time={prep_time} />
                                    </div>

                                    <div>
                                        <RecipeCountry country={country} />
                                    </div>
                                </section>

                                <section className="flex flex-col justify-center items-start mb-4 px-4">
                                    <RecipeCategories categories={recipe_categories} />
                                </section>
                                
                                <section className="mb-4 px-4">
                                    <RecipeIngredients ingredients={ingredients} />
                                </section>
                                
                                <section className="px-4">
                                    <RecipeInstructions instructions={instructions} />
                                </section>

                                <section className="flex justify-end items-center gap-4 border-t-2 border-border pt-4 px-4">
                                    <button type="button" onClick={() => handleOnClose()} className="bg-background-light text-text-primary rounded-2xl px-4 py-2 cursor-pointer">Cancel</button>
                                    <button type="submit" className="bg-primary text-card rounded-2xl px-4 py-2 cursor-pointer">Save Changes</button>
                                </section>
                            </form>
                        </FormProvider>
                    </main>
                </DialogPanel>
            </div>
        </Dialog>
    )
}