import SectionSetting from "@features/settings/components/SectionSetting";

export default function Settings() {

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
            </section>
        </main>
    )
}