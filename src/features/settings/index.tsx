import Dark from "@/assets/icons/Dark";
import Light from "@/assets/icons/Light";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";

export default function Settings() {
    const [currentTheme, setCurrentTheme] = useState<string | null>(null)

    const handleClick = (type: string) => {
        setCurrentTheme(type)
        document.documentElement.setAttribute("data-theme", type)
        localStorage.setItem("theme", type)
    }

    useEffect(() => {
        const saveTheme = localStorage.getItem("theme")
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        const themeToApply = saveTheme || (systemPrefersDark ? "dark" : "light")

        setCurrentTheme(themeToApply)
        document.documentElement.setAttribute("data-theme", themeToApply)
    }, [])

    return (
        <main>
            <section>
                <h2
                    className="text-text-primary dark:text-text-secondary-dark font-semibold text-xl mb-4"    
                >
                    Appearance
                </h2>

                <div className="bg-card dark:bg-card-dark rounded-2xl border border-border dark:border-border-dark p-6 flex justify-between items-center">
                    <div>
                        <h4 className="text-text-primary dark:text-text-secondary-dark font-semibold text-md">Theme</h4>
                        <small className="text-text-secondary dark:text-text-secondary-dark font-normal text-sm">Select your preferred interface style</small>
                    </div>

                    <div className="flex justify-between items-center">
                        <Button 
                            title="Light"
                            type="button"
                            titleCss={`text-base"
                                    ${currentTheme === "light" ? "text-text-primary" : "text-text-secondary"}
                                `}
                            icon={Light}
                            iconCss={`h-5 w-5
                                    ${currentTheme === "light" ? "text-text-primary" : "text-text-secondary"}
                                `}
                            buttonCss={`cursor-pointer rounded-l-3xl py-2 px-4 border border-border dark:border-border-dark border-r-0 flex justify-center items-center gap-2
                                    ${currentTheme === "light" ? "bg-background-light" : "cursor-pointer bg-gray-200"}
                                `}
                            handleClick={() => handleClick('light')}
                        />

                        <Button
                            title="Dark" 
                            type="button"
                            titleCss={`text-base"
                                    ${currentTheme === "dark" ? "text-text-primary" : "text-text-secondary"}
                                `}
                            icon={Dark}
                            iconCss={`h-5 w-5
                                    ${currentTheme === "dark" ? "text-text-primary" : "text-text-secondary"}
                                `}
                            buttonCss={`rounded-r-3xl py-2 px-4 border border-border dark:border-border-dark border-l-0 flex justify-center items-center gap-2
                                    ${currentTheme === "dark" ? "bg-background-light" : "cursor-pointer bg-gray-200"}
                                `}
                            handleClick={() => handleClick('dark')}
                        />
                    </div>
                </div>
            </section>
        </main>
    )
}