import { useEffect, useState } from "react";
import type { Category, RecipeCategory } from "@features/recipes/types";
import { GET_CATEGORIES } from "../lib/utils/getCategories";
import { useFormContext } from "react-hook-form";

interface RecipeCategoriesProps {
    categories: RecipeCategory[]
}

export default function RecipeCategories({ 
        categories 
    }: RecipeCategoriesProps) {
    const [categoryList, setCategoryList] = useState<RecipeCategory[]>(categories)
    const {setValue, formState: {errors}} = useFormContext()

    const handleChangeCategories = (newCate: Category) => {
        const exists = categoryList.some(c => c.categories.id === newCate.id)

        const updated = exists
            ? categoryList.filter(c => c.categories.id !== newCate.id)
            : [...categoryList, { categories: newCate }]

        setCategoryList(updated)
        setValue("recipe_categories", updated, { shouldValidate: true })
    }

    useEffect(() => {
        if (categoryList.length === 0 && categories.length > 0) {
            setCategoryList(categories)
        }
    }, [categories])

    return (
        <>
            <label 
                htmlFor="category" 
                className="text-text-secondary dark:text-text-secondary-dark text-sm">
                    Categories
            </label>

            <div 
                className={`grid grid-cols-1 md:grid-cols-6 justify-between items-center gap-2 bg-background-light rounded-lg border-2 
                    ${errors.recipe_categories 
                        ? "border-red-600" 
                        : "border-border"
                    } p-4 w-full`}
                >
            {
                GET_CATEGORIES.map((cate) => {

                    return (
                        <label 
                            key={cate.id} 
                            className="flex items-center gap-2 text-text-secondary text-xs"
                        >
                            <input 
                                type="checkbox" 
                                checked={categoryList.some(c => c.categories.id === cate.id)}
                                onChange={() => handleChangeCategories(cate)}
                                className="accent-primary w-4 h-4 cursor-pointer"
                            />
                            <span>{cate.name}</span>
                        </label>
                    )
                })
            }
            </div>

            {errors.recipe_categories && (
                <p className="text-red-600 text-sm mt-2">
                    {String(errors.recipe_categories.message) }
                </p>
            )}
        </>
        
    )
}