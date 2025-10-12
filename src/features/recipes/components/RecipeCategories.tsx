import { useState } from "react";
import type { Category, RecipeCategory } from "@features/recipes/types";
import { GET_CATEGORIES } from "../lib/utils/getCategories";

interface RecipeCategoriesProps {
    categories: RecipeCategory[]
}

export default function RecipeCategories({ categories }: RecipeCategoriesProps) {
    const [categoryList, setCategoryList] = useState(categories)

    const handleChangeCategories = (newCate: Category) => {
       const exists = categoryList.some(c => c.categories.name === newCate.name)
        // If selected, it's removed
        if (exists) {
            setCategoryList(categoryList.filter(c => c.categories.name !== newCate.name))
        }else{
            // If not selected, gets selected
            setCategoryList([...categoryList, { categories: newCate }])
        }
    }

    return (
        <>
            <label htmlFor="category" className="text-text-secondary text-sm">Categories</label>
            <div className="grid grid-cols-1 md:grid-cols-6 justify-between items-center gap-2 bg-background-light rounded-lg border-2 border-border p-4 w-full">
            {
                GET_CATEGORIES.map((cate) => (
                    <label key={cate.id} className="flex items-center gap-2 text-text-secondary text-xs">
                        <input 
                            type="checkbox" 
                            checked={categoryList.some(c => c.categories.name === cate.name)}
                            onChange={() => handleChangeCategories(cate)}
                            className="accent-primary w-4 h-4 cursor-pointer"
                        />
                        <span>{cate.name}</span>
                    </label>
                ))
            }
            </div>
        </>
        
    )
}