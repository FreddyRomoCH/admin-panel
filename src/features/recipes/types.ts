export interface Recipes {
    id: string,
    title: string,
    description: string,
    main_image: string,
    servings: number,
    prep_time: number,
    country: string,
    recipe_categories: RecipeCategory[]
}

export interface RecipeCategory {
    categories: Category
}

export interface Category {
    name: string
}