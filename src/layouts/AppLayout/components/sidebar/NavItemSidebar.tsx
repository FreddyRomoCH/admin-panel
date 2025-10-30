import { NavLink } from "react-router-dom";
import type { SidebarNavItem } from "@/layouts/AppLayout/types";
import IconHome from "@/assets/IconHome";
import IconProject from "@/assets/IconProject";
import IconRecipe from "@/assets/IconRecipe";
import IconUsers from "@/assets/IconUsers";
import { useTranslation } from "react-i18next";

interface NavItemSidebarProps {
    item: SidebarNavItem;
}

export default function NavItemSidebar({ item }: NavItemSidebarProps) {
    const { t } = useTranslation()

    return (
        <NavLink 
         to={item.path}
         className={({ isActive }) => {
            return [
                "text-base hover:bg-background-light dark:hover:bg-card-dark hover:text-primary hover:font-medium transition-all px-3 w-full py-2 rounded-lg flex gap-2 items-center",
                isActive
                    ? "bg-background-light dark:bg-card-dark text-primary font-medium"
                    : "text-text-secondary dark:text-text-secondary-dark font-light"
            ].join(" ")
        }}>
            { item.icon === "home" && <IconHome /> }
            { item.icon === "folder" && <IconProject /> }
            { item.icon === "book" && <IconRecipe/> }
            { item.icon === "users" && <IconUsers /> }
            { t(item.label) }
        </NavLink>
    )
}