import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { registerScheme, type RegisterSchemeType } from "@features/register/lib/scheme/registerScheme"
import Button from "@/components/ui/Button"
import { useAuthStore } from "@/store/useAuthStore"
import toast from "react-hot-toast"

export default function Register () {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const {registerUser} = useAuthStore()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<RegisterSchemeType>({
        resolver: zodResolver(registerScheme),
        mode: "onChange"
    })

    const onSubmit = async (data: RegisterSchemeType) => {

        const result = await registerUser(data)

        if (!result.success) {
            toast.error(result.error || "Unable to register the user. Try again later")
            return
        }

        toast.success("User registered successfully!")

        // Redirect to Login with email
        navigate("/login")


    }

    return (
        <main className="flex flex-col w-full animate-slide-in-top">
            <div className="bg-card dark:bg-card-dark rounded-2xl shadow-lg shadow-black/10 p-12 max-w-2xl w-full m-auto h-auto flex flex-col justify-center items-center gap-2 text-center">
                <h1 className="text-text-primary dark:text-text-secondary-dark font-semibold text-4xl mb-2">
                    { t("Create A New User") }
                </h1>

                <p className="text-text-secondary dark:text-text-secondary-dark mb-8 font-light text-base w-xs mx-auto text-center">
                    { t("Allow them to manage their own projects") }.
                </p>

                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full"
                >
                    <div className="flex justify-around items-start gap-2">
                        {/* First Name */}
                        <div className="flex flex-col justify-center items-start mb-4 w-full">
                            <label 
                                htmlFor="first-name"
                                className="text-text-secondary dark:text-text-secondary-dark text-base mb-2"
                            >
                                    {t("First Name")}
                            </label>

                            <input 
                                {...register("first_name")}
                                type="text" 
                                id="first_name"
                                autoComplete="First Name"
                                placeholder={ t("Enter your first name") } 
                                className={`bg-white w-full rounded-lg px-3 py-4 border focus:ring-2 focus:ring-primary focus:outline-none
                                    ${errors.first_name ? "border-red-600" : "border-border dark:border-border-dark"} 
                                `}
                            />

                            {errors.first_name && (
                                <p className="text-red-600 text-sm mt-2">{ errors.first_name.message }</p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div className="flex flex-col justify-center items-start mb-4 w-full">
                            <label 
                                htmlFor="last-name"
                                className="text-text-secondary dark:text-text-secondary-dark text-base mb-2"
                            >
                                    {t("Last Name")}
                            </label>

                            <input 
                                {...register("last_name")}
                                type="text" 
                                id="last-name"
                                autoComplete="Last Name"
                                placeholder={ t("Enter your last name") } 
                                className={`bg-white w-full rounded-lg px-3 py-4 border focus:ring-2 focus:ring-primary focus:outline-none
                                    ${errors.last_name ? "border-red-600" : "border-border dark:border-border-dark "} 
                                `}
                            />

                            {errors.last_name && (
                                <p className="text-red-600 text-sm mt-2">{ errors.last_name.message }</p>
                            )}
                        </div>
                    </div>

                    {/* Username */}
                    <div className="flex flex-col justify-center items-start mb-4">
                        <label 
                            htmlFor="username"
                            className="text-text-secondary dark:text-text-secondary-dark text-base mb-2"
                        >
                                {t("Username")}
                        </label>

                        <input 
                            {...register("username")}
                            type="username" 
                            id="username" 
                            name="username" 
                            autoComplete="username"
                            placeholder={ t("Choose a username") } 
                            className={`bg-white w-full rounded-lg px-3 py-4 border focus:ring-2 focus:ring-primary focus:outline-none
                                ${errors.username ? "border-red-600" : "border-border dark:border-border-dark "} 
                            `}
                        />

                        {errors.username && (
                            <p className="text-red-600 text-sm mt-2">{ errors.username.message }</p>
                        )}
                    </div>

                    {/* Email */}
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
                            className={`bg-white w-full rounded-lg px-3 py-4 border focus:ring-2 focus:ring-primary focus:outline-none
                                ${errors.email ? "border-red-600" : "border-border dark:border-border-dark "} 
                            `}
                        />

                        {errors.email && (
                            <p className="text-red-600 text-sm mt-2">{ errors.email.message }</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col justify-center items-start mb-4">
                        <label 
                            htmlFor="password"
                            className="text-text-secondary dark:text-text-secondary-dark text-base mb-2"
                        >
                                {t("Password")}
                        </label>

                        <input 
                            {...register("password")}
                            type="password" 
                            id="password" 
                            name="password" 
                            autoComplete="password"
                            placeholder={ t("Create a password") } 
                            className={`bg-white w-full rounded-lg px-3 py-4 border focus:ring-2 focus:ring-primary focus:outline-none
                                ${errors.password ? "border-red-600" : "border-border dark:border-border-dark"} 
                            `}
                        />

                        {errors.password && (
                            <p className="text-red-600 text-sm mt-2">{ errors.password.message }</p>
                        )}
                    </div>

                    <div className="flex flex-col justify-center items-start mb-4">
                        <label 
                            htmlFor="checkbox"
                            className="text-text-secondary dark:text-text-secondary-dark"    
                        >
                            <input 
                                type="checkbox" 
                                className="mr-4"
                                {...register("is_admin")}
                            />
                            Create as Admin?
                        </label>
                        
                    </div>
                    
                    <Button 
                        title={ 
                            isSubmitting 
                                ? t("Creating...") 
                                : t("Create Account") 
                        }
                        type="submit"
                        titleCss="text-white text-lg font-light"
                        buttonCss={`bg-primary w-full rounded-lg py-4 cursor-pointer hover:bg-text-primary transform transition duration-150 ease-in-out
                            ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}    
                        `}
                    />
                </form>
            </div>
        </main>
    )
}