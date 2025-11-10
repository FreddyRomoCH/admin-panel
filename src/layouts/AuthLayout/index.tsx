import { Outlet } from "react-router-dom";

export default function AuthLayout() {

    return (
        <div className="flex min-h-screen min-w-screen">

            <div className="flex flex-col justify-center w-dvw h-dvh bg-background-light dark:bg-background-dark p-4">
                <main className="h-screen flex justify-center items-center">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}