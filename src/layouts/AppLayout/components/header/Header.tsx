import { useLocation } from "react-router-dom"
import { sidebarNavs } from "@layouts/AppLayout/constants/sidebarNavs";

export default function Header() {
    const location = useLocation();
    const currentLocation = sidebarNavs.find((item) => item.path === location.pathname )

    const title = currentLocation ? currentLocation.label : "Freddy Panel"

    return (
        <div className="flex justify-between items-center py-8">
            <h1 className="font-inter text-3xl font-bold text-foreground-light">{title}</h1>
            <img className="rounded-full h-12 w-12 object-cover" src="/images/Freddy_pequeno.jpeg" alt="Admin Profile Image" />
        </div>
    )
}