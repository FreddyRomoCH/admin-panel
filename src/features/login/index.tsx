import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { loginScheme, type LoginSheme } from "@features/login/lib/scheme/loginScheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@features/login/lib/supabaseAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<LoginSheme>({
        resolver: zodResolver(loginScheme)
    })

    const onSubmit = async (data: LoginSheme) => {
        const { email, password } = data
        
        const { error } = await signIn(email, password)

        if (error) {
            if (error.message.includes("Invalid login credentials")) {
                toast.error(t("Invalid email or password"), {
                    style: { background: "#ffe2e3", color: "#475569", fontSize: "14px" }
                })
            } else {
                toast.error(t("An unexpected error occurred. Please try again"), {
                    style: { background: "#ffe2e3", color: "#475569", fontSize: "14px" }
                })
            }

            reset({
                email: "",
                password: ""
            })

            return
        }

        toast.success(t("Login successful!"), {
            style: { background: "#defae6", color: "#475569", fontSize: "14px" }
        })

        // Redirect to dashboard
        navigate("/")


    }

    return (
        <main className="flex flex-col w-full animate-slide-in-top">
            <div className="bg-card dark:bg-card-dark rounded-2xl shadow-lg shadow-black/10 p-12 max-w-lg w-full m-auto h-auto flex flex-col justify-center items-center gap-2 text-center">
                <h1 className="text-text-primary dark:text-text-secondary-dark font-semibold text-4xl mb-2">
                    { t("Welcome Back") }
                </h1>

                <p className="text-text-secondary dark:text-text-secondary-dark mb-8 font-light text-base w-xs mx-auto text-center">
                    { t("Sign in to your dashboard to manage your projects") }.
                </p>

                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full"
                >
                    <div className="flex flex-col justify-center items-start mb-4">
                        <label 
                            htmlFor="email"
                            className="text-text-secondary dark:text-text-secondary-dark text-base mb-2"
                        >
                                {t("Email")}
                        </label>

                        <input 
                            {...register("email")}
                            type="email" 
                            id="email" 
                            name="email" 
                            autoComplete="email"
                            placeholder={ t("you@example.com") } 
                            className={`bg-white w-full rounded-lg px-3 py-4 border border-border dark:border-border-dark focus:ring-2 focus:ring-primary focus:outline-none
                                ${errors.email ? "border-red-600" : ""}    
                            `}
                        />

                        {errors.email && (
                            <p className="text-red-600 text-sm mt-2">{ errors.email.message }</p>
                        )}

                    </div>

                    <div className="flex flex-col justify-center items-start mb-6">
                        <label 
                            htmlFor="password"
                            className="text-text-secondary dark:text-text-secondary-dark text-base mb-2"
                        >
                            { t("Password") }
                        </label>

                        <input 
                            {...register("password")}
                            type="password" 
                            id="password" 
                            name="password" 
                            autoComplete="current-password"
                            placeholder={ t("Enter your password") }
                            className={`bg-white w-full rounded-lg px-3 py-4 border border-border dark:border-border-dark focus:ring-2 focus:ring-primary focus:outline-none
                                ${errors.password ? "border-red-600" : ""}    
                            `}
                        />

                        {errors.password && (
                            <p className="text-red-600 text-sm mt-2">{ errors.password.message }</p>
                        )}

                    </div>

                    {/* Forgot your password? */}
                    <Button 
                        title={ 
                            isSubmitting 
                                ? t("Signing In...") 
                                : t("Sign In") 
                        }
                        type="submit"
                        titleCss="text-white text-lg font-light"
                        buttonCss={`bg-primary w-full rounded-lg py-4 cursor-pointer hover:bg-text-primary transform transition duration-150 ease-in-out
                            ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}    
                        `}
                    />
                </form>
            </div>

            <p className="text-text-secondary dark:text-text-secondary-dark text-center mt-8 font-extralight">@ 2025 Freddy Romo DEV. { t("All rights reserved") }</p>
        </main>
    )
}