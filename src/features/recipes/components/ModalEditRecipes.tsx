import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Recipes } from "@features/recipes/types"
import RecipeDescription from "@features/recipes/components/RecipeDescription"
import RecipeServings from "@features/recipes/components/RecipeServings"
import RecipePrepTime from "@features/recipes/components/RecipePrepTime"
import RecipeCountry from "@features/recipes/components/RecipeCountry"
import RecipeCategories from "@features/recipes/components/RecipeCategories"
import RecipeImage from "@features/recipes/components/RecipeImage"
import { recipeSchema, recipeSchemaEdit } from "@features/recipes/lib/schema/recipe"
import RecipeLists from "@features/recipes/components/RecipeLists"
// import { supabase } from "@/lib/supabaseClient"
import { useRecipesStore } from "@/store/useRecipesStore"
import { useEffect } from "react"
import Input from "@/components/ui/Input"
import toast from "react-hot-toast"

interface ModalEditRecipesProps {
    isOpen: boolean,
    handleOnClose: () => void,
    recipe?: Recipes
    mode: "edit" | "create"
}

export default function ModalEditRecipes({ 
        isOpen, 
        handleOnClose, 
        recipe,
        mode
    }: ModalEditRecipesProps) {

    const {
        title = "", 
        description = "", 
        main_image = "", 
        servings = 0, 
        prep_time = 0, 
        country = "", 
        recipe_categories = [], 
        ingredients = [], 
        instructions = []
    } = recipe || {}

    // const updateRecipe = useRecipesStore((state) => state.updateRecipes)
    const { updateRecipe, addRecipes, error } = useRecipesStore()

    const schema = mode === "create" ? recipeSchema : recipeSchemaEdit

    // const adminKey = import.meta.env.VITE_ADMIN_KEY

    const defaultValues = mode === "create"
        ? {
            title: "",
            description: "",
            main_image: "",
            servings: 0,
            prep_time: 0,
            country: "",
            recipe_categories: [],
            ingredients: [],
            instructions: []
        }
        : {
            id: recipe?.id ?? "",
            title: recipe?.title ?? "",
            description: recipe?.description ?? "",
            main_image: recipe?.main_image ?? "",
            servings: recipe?.servings ?? 0,
            prep_time: recipe?.prep_time ?? 0,
            country: recipe?.country ?? "",
            recipe_categories: recipe?.recipe_categories ?? [],
            ingredients: recipe?.ingredients ?? [],
            instructions: recipe?.instructions ?? []
        }

        const methods = useForm<Recipes>({
            resolver: zodResolver(schema),
            defaultValues: defaultValues as Recipes
        })

    useEffect(() => {
        methods.reset(recipe)
    }, [recipe])

    const {handleSubmit} = methods

    const onSubmit = async (data: Recipes) => {
        // Save data on recipes table

        if (mode === "edit") {

            await updateRecipe(data as Recipes)

            if (error) {
                toast.error(`Unable to update the recipe. Try again later`, {
                    style: {
                        background: '#ffe2e3',
                        color: '#475569',
                        fontSize: '14px'
                    }
                })
            } else {
                toast.success(`Recipe ${data.title} updated successfully!`, {
                    style: {
                        background: '#defae6',
                        color: '#475569',
                        fontSize: '14px'
                    }
                })
            }

        } else if (mode === "create") {

            await addRecipes(data as Recipes)

            if (error) {
                toast.error(`Unable to add the recipe. Try again later`, {
                    style: {
                        background: '#ffe2e3',
                        color: '#475569',
                        fontSize: '14px'
                    }
                })
            } else {
                toast.success(`Recipe ${data.title} added successfully!`, {
                    style: {
                        background: '#defae6',
                        color: '#475569',
                        fontSize: '14px'
                    }
                })
            }
        }

        // updateRecipe(data)
        handleOnClose()
    }

    return (
        <Dialog open={isOpen} onClose={handleOnClose}>
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center">
                {/* <Button onClick={handleOnClose}>Close Recipe</Button> */}
                <DialogPanel className="max-w-3xl w-full max-h-4/5 bg-white dark:bg-card-dark rounded-2xl">
                    <header className="border-b-2 border-border dark:border-border-dark p-6">
                        <DialogTitle className="text-lg font-semibold text-text-primary dark:text-text-secondary-dark">
                            {mode === "edit" ? "Edit Recipe" : "Create recipe"}
                        </DialogTitle>
                    </header>

                    <div className="overflow-y-auto max-h-[calc(80vh-6rem)] scrollbar-thin scrollbar-thumb-primary scrollbar-track-background-light">
                        <main className="py-6">
                            <FormProvider {...methods}>
                                <form onSubmit={handleSubmit(onSubmit)} id="form-edit-recipe">
                                    <section className="flex justify-between items-start gap-4 mb-4 px-4">
                                        <RecipeImage mainImage={main_image} title={title} />

                                        <div className="flex flex-col justify-start items-left gap-4 w-full">
                                            <div>
                                                {/* <RecipeName title={title} /> */}
                                                <Input 
                                                    value={mode === "edit" ? title : ""}
                                                    type="text"
                                                    title="Name"
                                                    id="title"
                                                    validation="title"
                                                    labelClass="text-text-secondary text-sm dark:text-text-secondary-dark"
                                                    inputClass="bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 px-4 py-1"
                                                />
                                            </div>
                                            <div>
                                                <RecipeDescription 
                                                    description={description}
                                                />
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

                    <footer className="border-t-2 border-border dark:border-border-dark p-4 flex justify-end items-center gap-4 bg-card dark:bg-card-dark sticky bottom-0 shrink-0">
                        <button 
                            type="button" 
                            onClick={() => handleOnClose()} 
                            className="bg-background-light text-text-primary rounded-2xl px-4 py-2 cursor-pointer"
                        >
                                Cancel
                        </button>

                        <button 
                            type="submit" 
                            form="form-edit-recipe" 
                            className="bg-primary text-card rounded-2xl px-4 py-2 cursor-pointer"
                        >
                            {mode === "edit" ? "Save Changes" : "Add Recipe"}
                        </button>
                    </footer>
                </DialogPanel>
            </div>
        </Dialog>
    )
}