import { Outlet } from "react-router-dom";
import Sidebar from "@/layouts/AppLayout/components/sidebar";
import Header from "@/layouts/AppLayout/components/header/Header";

export default function AppLayout() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] md:min-h-screen min-w-screen">
            <aside className="bg-background-base dark:bg-background-dark border-r border-border -translate-x-full md:translate-x-0 hidden md:block">
                <Sidebar />
            </aside>

            <div className="flex flex-col justify-start md:h-screen bg-background-light dark:bg-background-dark p-4">
                <header>
                    <Header />
                </header>

                <main className="md:h-screen">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}