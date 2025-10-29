export interface Recipes {
    id?: string,
    title: string,
    description: string,
    main_image: string,
    servings: number,
    prep_time: number,
    country: string,
    recipe_categories: RecipeCategory[],
    ingredients: string[],
    instructions: string[],
    is_active?: boolean
}

export interface RecipeCategory {
    categories: Category
}

export interface Category {
    id: number,
    name: string
}