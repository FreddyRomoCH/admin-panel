import IconEdit from "@/assets/IconEdit";
import type { RecipeCategory, Recipes } from "@features/recipes/types";

interface TableRecipesProps {
    recipes: Recipes[]
    onEdit: (recipe: Recipes) => void
}

export default function TableRecipes({ onEdit, recipes }: TableRecipesProps) {

    return (
        <>
        {
            recipes.map((recipe: Recipes) => (
                <tr key={recipe.title}>
                    <td className="px-4 py-2 text-center align-middle">
                        <img className="h-12 aspect-square object-cover rounded-lg inline-block" src={recipe.main_image} alt={recipe.title} />
                    </td>
                    <td className="px-4 py-2">
                        <h2 className="font-semibold">{ recipe.title }</h2>
                    </td>
                    <td className="px-4 py-2">
                        <ul>
                        {recipe.recipe_categories.map((cate: RecipeCategory) =>
                            <li key={cate.categories.name}>{cate.categories.name}</li>
                        )}
                        </ul>
                    </td>
                    <td>
                        <button onClick={() => onEdit(recipe)}>
                            <IconEdit color="text-text-secondary" className="cursor-pointer"  />
                        </button>
                    </td>
                </tr>
            ))
        }
        </>
    )
}