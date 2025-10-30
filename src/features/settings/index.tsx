import Dark from "@/assets/icons/Dark";
import Light from "@/assets/icons/Light";
import Button from "@/components/ui/Button";

export default function Settings() {

    return (
        <main>
            <section>
                <h2
                    className="text-text-primary font-semibold text-xl mb-4"    
                >
                    Appearance
                </h2>

                <div className="bg-card rounded-2xl border border-border p-6 flex justify-between items-center">
                    <div>
                        <h4 className="text-text-primary font-semibold text-md">Theme</h4>
                        <small className="text-text-secondary font-normal text-sm">Select your preferred interface style</small>
                    </div>

                    <div className="flex justify-between items-center">
                        <Button 
                            title="Light"
                            type="button"
                            titleCss="text-base text-text-primary"
                            icon={Light}
                            iconCss="text-text-primary h-5 w-5"
                            buttonCss="cursor-pointer rounded-l-3xl bg-background-light py-2 px-4 border border-border border-r-0 flex justify-center items-center gap-2"
                        />

                        <Button
                            title="Dark" 
                            type="button"
                            titleCss="text-base text-text-secondary"
                            icon={Dark}
                            iconCss="text-text-secondary h-5 w-5"
                            buttonCss="cursor-pointer rounded-r-3xl bg-background-light py-2 px-4 border border-border border-l-0 flex justify-center items-center gap-2"
                        />
                    </div>
                </div>
            </section>
        </main>
    )
}