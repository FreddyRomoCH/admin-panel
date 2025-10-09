export interface Recipes {
    id: string,
    title: string,
    main_image: string,
    recipe_categories: RecipeCategory[]
}

export interface RecipeCategory {
    categories: Category
}

export interface Category {
    name: string
}