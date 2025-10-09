import IconSetting from "@/assets/IconSetting";
import { NavLink } from "react-router-dom";

export default function FooterSidebar() {
    return (
        <NavLink className="text-base text-text-secondary hover:bg-background-light hover:text-primary hover:font-medium transition-all px-3 w-full py-2 rounded-lg flex gap-2 items-center" to="/settings">
            <IconSetting />
            Settings
        </NavLink>
    )
}