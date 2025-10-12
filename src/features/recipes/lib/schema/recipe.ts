import { z } from "zod";

export const recipeSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(3, "Description must be at least 3 characters")
})

export type RecipeFormData = z.infer<typeof recipeSchema>