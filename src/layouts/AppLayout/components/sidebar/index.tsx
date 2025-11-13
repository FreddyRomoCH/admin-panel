import HeaderLogo from '@/layouts/AppLayout/components/sidebar/HeaderSidebar';
import FooterSidebar from '@/layouts/AppLayout/components/sidebar/FooterSidebar';
import SideNavs from '@/layouts/AppLayout/components/sidebar/NavsSidebar';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';
import IconMenuClose from '@/assets/icons/IconMenuClose';

interface SidebarProps {
    handleClick: () => void
}

export default function Sidebar({ handleClick }: SidebarProps) {
    const { user, fetchSession } = useAuthStore()

    useEffect(() => {
        fetchSession()
    }, [])

    return (
        <div className="flex flex-col h-full gap-8 px-12 md:px-8 py-12 md:py-6">
            <div 
                onClick={handleClick}
                className="block md:hidden"
            >
                <IconMenuClose 
                    className="text-primary w-auto h-12"
                />
            </div>

            <header>
                <HeaderLogo name={user?.first_name ?? ""} />
            </header>

            <div className="flex flex-col justify-between h-full">
                <SideNavs 
                    isAdmin={user?.is_admin ?? false} 
                    handleClick={handleClick}
                />

                <footer>
                    <FooterSidebar />
                </footer>
            </div>
        </div>
    )
}