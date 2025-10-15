import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { PROJECT_STATUS } from "@features/clients/constants/status"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { clientSchema } from "@features/clients/lib/schema/client"
import type { Clients } from "@features/clients/types/clients"
import { useClientsStore } from "@/store/useClientsStore"

interface ModalAddClientProps {
    handleOnClose: () => void
    isOpen: boolean
}

export default function ModalAddClient({ handleOnClose, isOpen }: ModalAddClientProps) {
    const {error, addClient} = useClientsStore()
    
    const methods = useForm<Clients>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            project_status: "paid"
        }
    })

    const {handleSubmit} = methods

    const onSubmit = (client: Clients) => {
        if (error) {
            throw error
            return
        }

        addClient(client)
        handleOnClose()
    }

    return (
        <Dialog open={isOpen} onClose={handleOnClose}>
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel className="max-w-3xl w-full max-h-4/5 bg-white rounded-2xl">
                    <header className="border-b-2 border-border p-6">
                        <DialogTitle className="text-lg font-semibold">Add Client</DialogTitle>
                    </header>

                    <div className="overflow-y-auto max-h-[calc(80vh-6rem)] scrollbar-thin scrollbar-thumb-primary scrollbar-track-background-light">
                        <main className="py-6">
                            <FormProvider {...methods}>
                                <form onSubmit={handleSubmit(onSubmit)} id="form-add-client">
                                    <section className="flex justify-center items-start gap-4 mb-4 px-4 flex-1">
                                        <div>
                                            <Input type="text" title="Client Name" id="client-name" validation="client_name" labelClass="text-text-secondary text-sm" inputClass="bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 border-border px-4 py-1" />
                                        </div>

                                        <div>
                                            <Input type="text" title="Project Name" id="project-name" validation="project_name" labelClass="text-text-secondary text-sm" inputClass="bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 border-border px-4 py-1" />
                                        </div>

                                        <div>
                                            <Select name="status" id="project-status" title="Project Status" validation="project_status" options={PROJECT_STATUS} labelClass="text-text-secondary text-sm" selectClass="bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 border-border px-4 py-1" value="Pending" />
                                        </div>

                                        <div>
                                            <Input type="date" id="project-due-date" title="Due Date" validation="due_date" labelClass="text-text-secondary text-sm" inputClass="bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 border-border px-4 py-1" />
                                        </div>
                                    </section>
                                </form>
                            </FormProvider>
                        </main>

                        <footer className="border-t-2 border-border p-4 flex justify-end items-center gap-4 bg-card sticky bottom-0 shrink-0 rounded-b-2xl">
                            <button type="button" onClick={() => handleOnClose()} className="bg-background-light text-text-primary rounded-2xl px-4 py-2 cursor-pointer">Cancel</button>
                            <button type="submit" form="form-add-client" className="bg-primary text-card rounded-2xl px-4 py-2 cursor-pointer">Add Client</button>
                        </footer>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}