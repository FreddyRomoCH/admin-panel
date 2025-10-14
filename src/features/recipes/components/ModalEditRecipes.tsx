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
import RecipeImage from "@features/recipes/components/RecipeImage"
import { recipeSchema } from "@features/recipes/lib/schema/recipe"
import RecipeLists from "@features/recipes/components/RecipeLists"
import { supabase } from "@/lib/supabaseClient"
import { useRecipesStore } from "@/store/useRecipesStore"
import { useEffect } from "react"

interface ModalEditRecipesProps {
    isOpen: boolean,
    handleOnClose: () => void,
    recipe: Recipes
}

export default function ModalEditRecipes({ isOpen, handleOnClose, recipe }: ModalEditRecipesProps) {
    const {title, description, main_image, servings, prep_time, country, recipe_categories, ingredients, instructions} = recipe
    const updateRecipe = useRecipesStore((state) => state.updateRecipes)

    const methods = useForm<Recipes>({
        resolver: zodResolver(recipeSchema),
        defaultValues: recipe
    })

    useEffect(() => {
        methods.reset(recipe)
    }, [recipe])

    const {handleSubmit} = methods

    const onSubmit = async (data: Recipes) => {
        // Save data on recipes table
        const {error: recipeError} = await supabase
            .from("recipes")
            .update({
                title: data.title,
                description: data.description,
                main_image: data.main_image,
                servings: data.servings,
                prep_time: data.prep_time,
                country: data.country,
                ingredients: data.ingredients,
                instructions: data.instructions
            })
            .eq("id", data.id)

        if (recipeError) {
            throw recipeError
        }

        // Save data recipe_categories
        const categoryIds = data.recipe_categories
            .map(c => Number(c.categories?.id))
            .filter(id => !isNaN(id))

        //Delete old relation between recipe and category
        const {error: errorRecipeCategories} = await supabase
            .from("recipe_categories")
            .delete()
            .eq("recipe_id", data.id)

        if (errorRecipeCategories) {
            throw errorRecipeCategories
        }

        const {error: newRecipeCategories} = await supabase
            .from("recipe_categories")
            .insert(
                categoryIds.map(catId => ({
                    recipe_id: data.id,
                    categories_id: catId
                }))
            )

        if (newRecipeCategories) {
            throw newRecipeCategories
        }
        
        updateRecipe(data)
        handleOnClose()
    }

    return (
        <Dialog open={isOpen} onClose={handleOnClose}>
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center">
                {/* <Button onClick={handleOnClose}>Close Recipe</Button> */}
                <DialogPanel className="max-w-3xl w-full max-h-4/5 bg-white rounded-2xl">
                    <header className="border-b-2 border-border p-6">
                        <DialogTitle className="text-lg font-semibold">Edit Recipe</DialogTitle>
                    </header>

                    <div className="overflow-y-auto max-h-[calc(80vh-6rem)] scrollbar-thin scrollbar-thumb-primary scrollbar-track-background-light">
                        <main className="py-6">
                            <FormProvider {...methods}>
                                <form onSubmit={handleSubmit(onSubmit)} id="form-edit-recipe">
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
                                        <RecipeLists list={ingredients} toValidate="ingredients" />
                                    </section>
                                    
                                    <section className="px-4 mb-4">
                                        <RecipeLists list={instructions} toValidate="instructions" />
                                    </section>
                                </form>
                            </FormProvider>
                        </main>
                    </div>

                    <footer className="border-t-2 border-border p-4 flex justify-end items-center gap-4 bg-card sticky bottom-0 shrink-0">
                        <button type="button" onClick={() => handleOnClose()} className="bg-background-light text-text-primary rounded-2xl px-4 py-2 cursor-pointer">Cancel</button>
                        <button type="submit" form="form-edit-recipe" className="bg-primary text-card rounded-2xl px-4 py-2 cursor-pointer">Save Changes</button>
                    </footer>
                </DialogPanel>
            </div>
        </Dialog>
    )
}