import Button from "@/components/ui/Button"
import Dark from "@/assets/icons/Dark";
import Light from "@/assets/icons/Light";
import { useEffect, useState } from "react"
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import { useUsersStore } from "@/store/useUsersStore";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";

interface SectionSettingProps {
    title: string
    subTitle: string
    parraf: string
    section: "theme" | "language" | "profile"
}

export default function SectionSetting({ 
    title,
    subTitle,
    parraf,
    section
}: SectionSettingProps) {
    const { user, setUser } = useAuthStore()

    const [currentTheme, setCurrentTheme] = useState<string | null>(user?.theme || localStorage.getItem("theme") || "light")
    const [currentLang, setCurrentLang] = useState<string | null>(user?.language || localStorage.getItem("language") || "en")
    const { themeUser } = useUsersStore()

    const { t } = useTranslation()

    const handleClick = async (type: string) => {

        if (type === "dark" || type === "light") {
            const themeUpdated = await themeUser(type as "light" | "dark")
            
            if (!themeUpdated) {
                toast.error("Failed to update theme preference")
                return
            }

            setCurrentTheme(type)
            document.documentElement.setAttribute("data-theme", type)
            localStorage.setItem("theme", type)
            if (user) setUser({ ...user, theme: type }) // Update user in auth store
            toast.success(t("Theme updated successfully"))
            
        } else if (type === "en" || type === "es") {
            setCurrentLang(type)
            i18n.changeLanguage(type)
            localStorage.setItem("language", type)
            toast.success(t("Language updated successfully"))
        }
    }

    useEffect(() => {
        if (user?.theme) {
            setCurrentTheme(user.theme)
            document.documentElement.setAttribute("data-theme", user.theme)
            localStorage.setItem("theme", user.theme)
        }
    }, [user?.theme])

    useEffect(() => {
        if (user?.language) {
            setCurrentLang(user.language)
            i18n.changeLanguage(user.language)
            localStorage.setItem("language", user.language)
        }
    }, [user?.language])

    return (
        <section>
            <h2
                className="text-text-primary dark:text-text-secondary-dark font-semibold text-xl mb-4"
            >
                { t(title) }
            </h2>

            <div className="bg-card dark:bg-card-dark rounded-2xl border border-border dark:border-border-dark p-6 flex justify-between items-center mb-8">
                <div>
                    <h4 
                        className="text-text-primary dark:text-text-secondary-dark font-semibold text-md"
                    >
                        {t(subTitle)}
                    </h4>

                    <small 
                        className="text-text-secondary dark:text-text-secondary-dark font-normal text-sm"
                    >
                        
                        { section === "language" && 
                            currentLang === "en" 
                                ? "English"
                                : section === "language" && 
                                    currentLang === "es"
                                        && "Español"   
                        }

                        { section !== "language" && t(parraf) }
                    </small>
                </div>

                
                <div className="flex justify-between items-center">
                    {section === "theme" && (
                        <>
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
                        </>
                    )}

                    {section === "language" && (
                        <>
                            <Button 
                                title="EN"
                                type="button"
                                titleCss={`text-base"
                                        ${currentLang === "en" ? "text-text-primary" : "text-text-secondary"}
                                    `}
                                iconCss={`h-5 w-5
                                        ${currentLang === "en" ? "text-text-primary" : "text-text-secondary"}
                                    `}
                                buttonCss={`rounded-l-3xl py-2 px-4 border border-border dark:border-border-dark border-l-0 flex justify-center items-center gap-2
                                        ${currentLang === "en" ? "bg-background-light" : "cursor-pointer bg-gray-200"}
                                    `}
                                handleClick={() => handleClick('en')}
                            />

                            <Button 
                                title="ES"
                                type="button"
                                titleCss={`text-base"
                                        ${currentLang === "es" ? "text-text-primary" : "text-text-secondary"}
                                    `}
                                iconCss={`h-5 w-5
                                        ${currentLang === "es" ? "text-text-primary" : "text-text-secondary"}
                                    `}
                                buttonCss={`rounded-r-3xl py-2 px-4 border border-border dark:border-border-dark border-l-0 flex justify-center items-center gap-2
                                        ${currentLang === "es" ? "bg-background-light" : "cursor-pointer bg-gray-200"}
                                    `}
                                handleClick={() => handleClick('es')}
                            />
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}