import { sidebarNavs } from "@layouts/AppLayout/constants/sidebarNavs"
import NavItemSidebar from "@layouts/AppLayout/components/sidebar/NavItemSidebar"
import type { RegisterSchemeType } from "@/features/register/lib/scheme/registerScheme"

interface NavsSidebarProps {
    isAdmin: RegisterSchemeType["is_admin"]
    handleClick: () => void
}

export default function SideNavs({isAdmin, handleClick}: NavsSidebarProps) {

    return (
        <nav 
            className="flex flex-col justify-center items-start gap-4"
            onClick={handleClick}
        >
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