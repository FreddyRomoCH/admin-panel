import Button from "@/components/ui/Button";
import { useAuthStore } from "@/store/useAuthStore";
import SectionSetting from "@features/settings/components/SectionSetting";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function Settings() {
    const { user, updateUser } = useAuthStore()
    const [currentAvatar, setCurrentAvatar] = useState(user?.avatar || "/images/avatar.png")
    // const [fileName, setFileName] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [currentUsername, setCurrentUsername] = useState(user?.username || "Username")
    const { t } = useTranslation()

    const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileAvatar = event.target.files?.[0] || null;
        if (!fileAvatar) return;

        setFile(fileAvatar);
    }

    const handleSaveChanges = async () => {
        if (!user?.id) return

        if (!file) {
            const result = await updateUser(currentUsername, null, undefined, user?.id);

            if (!result.success) {
                toast.error(t("Failed to update your username. Try again later"), {
                    style: {
                        background: '#ffe2e3',
                        color: '#475569',
                        fontSize: '14px'
                    }
                });
                return;
            }

            toast.success(t("Username updated successfully"), {
                style: {
                    background: "#defae6",
                    color: "#475569",
                    fontSize: "14px",
                },
            });
            return;
        }
        
        if (file) {
            // Encrypts the name of the file before upload
            const fileNameUUID = `${crypto.randomUUID()}.${file.name.split('.').pop()}`;

            const result = await updateUser(currentUsername, file, fileNameUUID, user?.id)

            if (!result.success) {
                toast.error("Failed to update your data. Try again later", {
                    style: {
                        background: '#ffe2e3',
                        color: '#475569',
                        fontSize: '14px'
                    }
                })
                return
            }

            if (result.user) {
                setCurrentAvatar(result.user?.username);
                toast.success("Data updated successfully", {
                    style: {
                        background: "#defae6",
                        color: "#475569",
                        fontSize: "14px",
                    },
                });
            }
        }
    }

    return (
        <main>
            <section>
                <SectionSetting 
                    title="Appearance"
                    subTitle="Theme"
                    parraf="Select your preferred interface style"
                    section="theme"
                />

                <SectionSetting 
                    title="Language"
                    subTitle="Language"
                    parraf="English"
                    section="language"
                />

                <section>
                    <h2 className="text-text-primary dark:text-text-secondary-dark font-semibold text-xl mb-4">
                        { t("Profile") }
                    </h2>

                    <div className="bg-card dark:bg-card-dark rounded-2xl border border-border dark:border-border-dark p-6 flex flex-col justify-between items-center mb-8 gap-6">

                        <div className="flex flex-row justify-between items-center w-full gap-4">
                            <div className="flex flex-col justify-center items-start gap-2 w-full">
                                <label 
                                    htmlFor="username"
                                    className="text-text-primary dark:text-text-secondary-dark font-semibold text-md"
                                >
                                    { t("Username") }
                                </label>

                                <input 
                                    type="text" 
                                    id="username" 
                                    name="username"
                                    className="bg-background-light border border-border dark:border-border-dark rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
                                    value={currentUsername}
                                    onChange={(e) => setCurrentUsername(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col justify-center items-start gap-2 w-full">
                                <label 
                                    htmlFor="username"
                                    className="text-text-primary dark:text-text-secondary-dark font-semibold text-md"
                                >
                                    Avatar
                                </label>

                                <div className="flex justify-center items-center gap-4">
                                    <input 
                                        type="file" 
                                        accept="image/webp, image/jpeg, image/png"
                                        id="username" 
                                        name="username"
                                        className="cursor-pointer bg-background-light border border-border dark:border-border-dark rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
                                        onChange={handleAvatarChange}
                                    />

                                    <img 
                                        src={file ? URL.createObjectURL(file) : currentAvatar} 
                                        alt="Avatar user" 
                                        className="rounded-full h-12 w-12 object-cover drop-shadow-lg drop-shadow-black/50"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end w-full">
                            <Button 
                                type="button"
                                buttonCss="bg-primary px-4 py-2 rounded-2xl text-sm text-card hover:scale-105 transform transition-transform duration-150 ease-in-out cursor-pointer"
                                title="Save Changes"
                                handleClick={handleSaveChanges}
                            />
                        </div>

                    </div>
                </section>
                
            </section>
        </main>
    )
}