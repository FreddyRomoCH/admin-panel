import { useRecipes } from "@features/recipes/hook/useRecipes"
import type { RecipeCategory, Recipes } from "@features/recipes/types"
import Skeleton from "@/components/ui/Skeleton"
import IconEdit from "@/assets/IconEdit"

export default function Recipes() {
    const {loading, error, recipes} = useRecipes()

    return (
        <main className="flex flex-col justify-center items-center">
            {error && (
                <p>Error</p>
            )}

            { loading ? (
                <table className="w-full border-collapse text-sm tracking-wide font-light">
                    <thead className="bg-background-light shadow rounded-t-2xl text-text-secondary">
                        <tr>
                            <th><Skeleton /></th>
                            <th><Skeleton /></th>
                            <th><Skeleton /></th>
                        </tr>
                    </thead>
                </table>
            ) : (
                <table className="w-full border-collapse text-sm tracking-wide font-light animate-blurred-fade-in">
                    <thead className="bg-background-light shadow rounded-t-2xl text-text-secondary">
                        <tr>
                            <th className="px-4 py-2 text-left">Image</th>
                            <th className="px-4 py-2 text-left">Title</th>
                            <th className="px-4 py-2 text-left">Category</th>
                            <th className="px-4 py-2 text-left"></th>
                        </tr>
                    </thead>

                    <tbody className="bg-card text-text-primary font-inter">
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
                                    <td><IconEdit color="text-text-secondary" className="cursor-pointer" /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            ) }
        </main>
    )
}