import { Outlet } from "react-router-dom";
import Sidebar from "@/layouts/AppLayout/components/sidebar";
import Header from "@/layouts/AppLayout/components/header/Header";

export default function AppLayout() {
    return (
        <div className="grid grid-cols-[250px_1fr] min-h-screen min-w-screen">
            <aside className="bg-background-base dark:bg-background-dark border-r border-border">
                <Sidebar />
            </aside>

            <div className="flex flex-col justify-start h-screen bg-background-light dark:bg-background-dark p-4">
                <header>
                    <Header />
                </header>

                <main className="h-screen">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}