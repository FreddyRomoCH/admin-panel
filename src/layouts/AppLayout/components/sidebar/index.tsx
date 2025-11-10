import HeaderLogo from '@/layouts/AppLayout/components/sidebar/HeaderSidebar';
import FooterSidebar from '@/layouts/AppLayout/components/sidebar/FooterSidebar';
import SideNavs from '@/layouts/AppLayout/components/sidebar/NavsSidebar';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';

export default function Sidebar() {
    const { user, fetchSession } = useAuthStore()

    useEffect(() => {
        fetchSession()
    }, [])

    return (
        <div className="flex flex-col h-full gap-8 px-8 py-6">
            <header>
                <HeaderLogo name={user?.first_name ?? ""} />
            </header>

            <div className="flex flex-col justify-between h-full">
                <SideNavs isAdmin={user?.is_admin ?? false} />

                <footer>
                    <FooterSidebar />
                </footer>
            </div>
        </div>
    )
}