import HeaderLogo from '@/layouts/AppLayout/components/sidebar/HeaderSidebar';
import FooterSidebar from '@/layouts/AppLayout/components/sidebar/FooterSidebar';
import SideNavs from '@/layouts/AppLayout/components/sidebar/NavsSidebar';

export default function Sidebar() {
    return (
        <div className="flex flex-col h-full gap-8 px-8 py-6">
            <header>
                <HeaderLogo />
            </header>

            <div className="flex flex-col justify-between h-full">
                <SideNavs />

                <footer>
                    <FooterSidebar />
                </footer>
            </div>
        </div>
    )
}