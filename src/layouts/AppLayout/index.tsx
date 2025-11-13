import { Outlet } from "react-router-dom";
import Sidebar from "@/layouts/AppLayout/components/sidebar";
import Header from "@/layouts/AppLayout/components/header/Header";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function AppLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
    const isDesktop = useMediaQuery({ minWidth: 768 });

    const handleToggleSidebar = () => {
        setIsSidebarOpen(prev => !prev)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen min-w-screen">
            <aside className={`bg-background-base dark:bg-background-dark transition-transform duration-200
                ${!isDesktop ? `fixed inset-0 z-10 h-dvh w-dvw ${isSidebarOpen ? "translate-x-0" : "-translate-x-full" }` : "relative border-r border-border"}    
            `}>
                <Sidebar 
                    handleClick={handleToggleSidebar} 
                />
            </aside>

            <div className="flex flex-col justify-start md:h-screen bg-background-light dark:bg-background-dark p-4">
                <header>
                    <Header 
                        handleOnCLick={handleToggleSidebar} 
                    />
                </header>

                <main className="md:h-screen">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}