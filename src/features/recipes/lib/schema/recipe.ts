import { z } from "zod";

export const recipeSchema = z.object({
    main_image: z.string("You must add an image"),
    country: z.string("You must select a country").min(2, "Country name required"),
    title: z.string("You must add a name").min(3, "Title must be at least 3 characters"),
    description: z.string("You must add a description").min(3, "Description must be at least 3 characters"),
    servings: z.number("You must select number of servings"),
    prep_time: z.number("You mustr select a preparation time"),
    recipe_categories: z.array(z.any()).min(1, "Recipe should have at least 1 category"),
    ingredients: z.array(z.any()).min(1, "Recipe should have at least 1 ingredient"),
    instructions: z.array(z.any()).min(1, "Recipe should have at least 1 instruction"),
})

export type RecipeFormData = z.infer<typeof recipeSchema>

export const recipeSchemaEdit = recipeSchema.extend({
    id: z.string(),
})