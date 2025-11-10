import { sidebarNavs } from "@layouts/AppLayout/constants/sidebarNavs"
import NavItemSidebar from "@layouts/AppLayout/components/sidebar/NavItemSidebar"
import type { RegisterSchemeType } from "@/features/register/lib/scheme/registerScheme"

interface NavsSidebarProps {
    isAdmin: RegisterSchemeType["is_admin"]
}

export default function SideNavs({isAdmin}: NavsSidebarProps) {

    return (
        <nav className="flex flex-col justify-center items-start gap-4">
            {sidebarNavs.map((item) => {

                const noShow = !isAdmin && item.label !== "Clients"

                if (noShow) return null

                return (
                    <NavItemSidebar 
                        key={item.path} 
                        item={item} 
                    />
                )
                })}
        </nav>
    )
}