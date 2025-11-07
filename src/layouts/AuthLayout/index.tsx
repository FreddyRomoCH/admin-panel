import { NavLink, Outlet } from "react-router-dom";
import HeaderLogo from "@layouts/AppLayout/components/sidebar/HeaderSidebar";
import IconRecipe from "@/assets/IconRecipe";
import IconProject from "@/assets/IconProject";
import IconHome from "@/assets/IconHome";

export default function AuthLayout() {

    const items = [
        { path: "/login", label: "Login", icon: "login" },
        { path: "/register", label: "Register", icon: "register" }
    ]

    return (
        <div className="grid grid-cols-[250px_1fr] min-h-screen min-w-screen">
            <aside className="bg-background-base dark:bg-background-dark border-r border-border">
                <div className="flex flex-col h-full gap-8 px-8 py-6">
                    <header>
                        <HeaderLogo />
                    </header>
        
                    <div className="flex flex-col justify-between h-full">
                        <nav className="flex flex-col justify-center items-start gap-4">
                        { items.map((item) => (
                            <NavLink 
                            key={item.label}
                                to={item.path}
                                className={({ isActive }) => {
                                return [
                                    "text-base hover:bg-background-light dark:hover:bg-card-dark hover:text-primary hover:font-medium transition-all px-3 w-full py-2 rounded-lg flex gap-2 items-center",
                                    isActive
                                        ? "bg-background-light dark:bg-card-dark text-primary font-medium"
                                        : "text-text-secondary dark:text-text-secondary-dark font-light"
                                ].join(" ")
                            }}>
                                { item.icon === "home" && <IconHome /> }
                                { item.icon === "folder" && <IconProject /> }
                                { item.icon === "book" && <IconRecipe/> }
                                { item.label }
                            </NavLink>
                        )) } 
                        </nav>
                    </div>
                </div>
            </aside>

            <div className="flex flex-col justify-start h-screen bg-background-light dark:bg-background-dark p-4">
                <header>
                    {/* <Header /> */}
                </header>

                <main className="h-screen flex justify-center items-center">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}