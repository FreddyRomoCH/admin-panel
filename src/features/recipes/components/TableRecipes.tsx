import IconEdit from "@/assets/IconEdit";
import IconClose from "@/assets/icons/IconClose";
import Select from "@/components/ui/Select";
import type { RecipeCategory, Recipes } from "@features/recipes/types";

interface TableRecipesProps {
    recipes: Recipes[]
    onDelete: (recipe: Recipes) => void
    onEdit: (recipe: Recipes) => void
    handleChangeActiveRecipe?: (val: string, recipe: Recipes) => void
}

export default function TableRecipes({ 
    onEdit,
    onDelete,
    recipes,
    handleChangeActiveRecipe
}: TableRecipesProps) {

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
                            <IconEdit 
                                className="text-text-secondary cursor-pointer" 
                            />
                        </button>
                    </td>

                    <td>
                        <button onClick={() => onDelete(recipe)}>
                            <IconClose 
                                className="text-red-600 w-6 h-6 cursor-pointer" 
                            />
                        </button>
                    </td>

                    <td>
                        <Select  
                            name={`recipe-${recipe.title}-active`}
                            id={`recipe-${recipe.title}-active`}
                            options={[
                                {label: "Yes", value: "yes"},
                                {label: "No", value: "no"}
                            ]}
                            labelClass=""
                            selectClass="border border-primary rounded-sm px-3 py-1 text-text-secondary"
                            optionClass=""
                            value={recipe.is_active ? "yes" : "no"}
                            recipe={recipe}
                            handleChangeActiveRecipe={handleChangeActiveRecipe}
                        />
                    </td>
                </tr>
            ))
        }
        </>
    )
}