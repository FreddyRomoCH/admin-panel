import { sidebarNavs } from "@layouts/AppLayout/constants/sidebarNavs"
import NavItemSidebar from "@layouts/AppLayout/components/sidebar/NavItemSidebar"

export default function SideNavs() {
    return (
        <nav className="flex flex-col justify-center items-start gap-4">
            {sidebarNavs.map((item) => (
                <NavItemSidebar key={item.path} item={item} />
            ))}
        </nav>
    )
}