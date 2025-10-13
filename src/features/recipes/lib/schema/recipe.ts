import { z } from "zod";

export const recipeSchema = z.object({
    id: z.string(),
    main_image: z.string(),
    country: z.string().min(2, "Country name required"),
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(3, "Description must be at least 3 characters"),
    servings: z.number(),
    prep_time: z.number(),
    recipe_categories: z.array(z.any()).min(1, "Recipe should have at least 1 category"),
    ingredients: z.array(z.any()).min(1, "Recipe should have at least 1 ingredient"),
    instructions: z.array(z.any()).min(1, "Recipe should have at least 1 instruction"),
})

export type RecipeFormData = z.infer<typeof recipeSchema>