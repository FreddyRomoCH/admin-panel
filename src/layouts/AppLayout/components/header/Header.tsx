import { useLocation } from "react-router-dom"
import { sidebarNavs } from "@layouts/AppLayout/constants/sidebarNavs";
import IconPlus from "@/assets/IconPlus";

export default function Header() {
    const location = useLocation();
    const currentLocation = sidebarNavs.find((item) => item.path === location.pathname )

    const title = currentLocation ? currentLocation.label : "Freddy Panel"

    return (
        <div className="flex justify-between items-center py-8">
            <h1 className="font-inter text-3xl font-bold text-foreground-light">{title}</h1>
            <div className="flex justify-center items-center gap-10">
                {
                    title === "Recipes" && (
                        <nav className="relative">
                            <a href="https://recipes.freddyromo.dev/add-recipe" target="_blank" rel="noopener norefer" className="bg-primary text-card text-sm rounded-2xl px-10 py-2">Add Recipes</a>
                            <IconPlus className="text-card w-5 h-5 absolute top-1 left-4" />
                        </nav>
                    )
                }
                <img className="rounded-full h-12 w-12 object-cover" src="/images/Freddy_pequeno.jpeg" alt="Admin Profile Image" />
            </div>
        </div>
    )
}