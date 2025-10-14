import { useLocation } from "react-router-dom"
import { sidebarNavs } from "@layouts/AppLayout/constants/sidebarNavs";
import IconPlus from "@/assets/IconPlus";
import Button from "@/components/ui/Button";

export default function Header() {
    const location = useLocation();
    const currentLocation = sidebarNavs.find((item) => item.path === location.pathname)
    const title = currentLocation ? currentLocation.label : "Freddy Panel"


    return (
        <div className="flex justify-between items-center py-8">
            <h1 className="font-inter text-3xl font-bold text-foreground-light">{title}</h1>
            <div className="flex justify-center items-center gap-10">
                {
                    title === "Recipes" && (
                        <Button title="Add Recipes" icon={IconPlus} href="https://recipes.freddyromo.dev/add-recipe" target="_blank" />
                    )
                }

                {
                    title === "Clients" && (
                        <Button title="Add Client" icon={IconPlus} />
                    )
                }
                <img className="rounded-full h-12 w-12 object-cover drop-shadow-lg drop-shadow-black/50" src="/images/Freddy_pequeno.jpeg" alt="Admin Profile Image" />
            </div>
        </div>
    )
}