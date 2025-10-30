import IconSetting from "@/assets/IconSetting";
import { NavLink } from "react-router-dom";

export default function FooterSidebar() {
    return (
        <NavLink 
            className={({ isActive }) => {
                return [
                    "text-base hover:bg-background-light dark:hover:bg-card-dark hover:text-primary hover:font-medium transition-all px-3 w-full py-2 rounded-lg flex gap-2 items-center",
                    isActive
                        ? "bg-background-light dark:bg-card-dark text-primary font-medium"
                        : "text-text-secondary dark:text-text-secondary-dark font-light"
                ].join(" ")
            }}
            to="/settings"
        >
            <IconSetting />
            Settings
        </NavLink>
    )
}