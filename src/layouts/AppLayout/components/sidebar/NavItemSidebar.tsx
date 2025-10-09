import { NavLink } from "react-router-dom";
import type { SidebarNavItem } from "@/layouts/AppLayout/types";
import IconHome from "@/assets/IconHome";
import IconProject from "@/assets/IconProject";
import IconRecipe from "@/assets/IconRecipe";
import IconUsers from "@/assets/IconUsers";

interface NavItemSidebarProps {
    item: SidebarNavItem;
}

export default function NavItemSidebar({ item }: NavItemSidebarProps) {
    return (
        <NavLink 
         to={item.path}
         className={({ isActive }) => {
            return [
                "text-base hover:bg-background-light hover:text-primary hover:font-medium transition-all px-3 w-full py-2 rounded-lg flex gap-2 items-center",
                isActive
                    ? "bg-background-light text-primary font-medium"
                    : "text-text-secondary font-light"
            ].join(" ")
        }}>
            { item.icon === "home" && <IconHome /> }
            { item.icon === "folder" && <IconProject /> }
            { item.icon === "book" && <IconRecipe/> }
            { item.icon === "users" && <IconUsers /> }
            {item.label}
        </NavLink>
    )
}