import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { PROJECT_STATUS } from "@features/clients/constants/status"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { cientSchemaEdit, clientSchema } from "@features/clients/lib/schema/client"
import type { Clients, NewClient } from "@features/clients/types/clients"
import { useClientsStore } from "@/store/useClientsStore"
import toast from "react-hot-toast"

interface ModalClientFormProps {
    handleOnClose: () => void
    isOpen: boolean
    mode: "create" | "edit"
    clientToEdit?: Clients | null
}

export default function ModalClientForm({ handleOnClose, isOpen, mode, clientToEdit }: ModalClientFormProps) {
    const {error, addClient, updateClient} = useClientsStore()

    const schema = mode === "create" ? clientSchema : cientSchemaEdit
    
    const methods = useForm<NewClient | Clients>({
        resolver: zodResolver(schema),
        defaultValues: 
            mode === "create"
                ? {
                    client_name: "",
                    project_name: "",
                    project_status: "paid",
                    due_date: ""
                }
                : {
                    client_id: clientToEdit?.client_id,
                    client_name: clientToEdit?.client_name,
                    project_name: clientToEdit?.project_name,
                    project_id: clientToEdit?.project_id,
                    project_status: clientToEdit?.project_status,
                    due_date: clientToEdit?.due_date
                }
    })

    const {handleSubmit, reset} = methods

    const onSubmit = async (client: NewClient | Clients) => {
        try {
            if (mode === "edit" && "client_id" in client) {
                await updateClient(client as Clients)

                if (!error) {
                    toast.success(`${client.client_name} updated successfully!`, {
                        style: {
                            background: "#defae6",
                            color: "#475569",
                            fontSize: "14px",
                        },
                    })
                } else {
                    toast.error(`Unable to add the client. Try again later`, {
                        style: {
                            background: '#ffe2e3',
                            color: '#475569',
                            fontSize: '14px'
                        }
                    })
                }
                
            } else {
                await addClient(client as NewClient)

                toast.success(`${client.client_name} - ${client.project_name} added successfully!`, {
                    style: {
                        background: '#defae6',
                        color: '#475569',
                        fontSize: '14px'
                    }
                })
            }

            reset()
            handleOnClose()
        } catch {
            toast.error(`Unable to add the client. Try again later`, {
                style: {
                    background: '#defae6',
                    color: '#475569',
                    fontSize: '14px'
                }
            })
        }

        // addClient(client)
        // handleOnClose()
        // toast.success(`${client.client_name} - ${client.project_name} added successfully!`, {
        //     style: {
        //         background: '#defae6',
        //         color: '#475569',
        //         fontSize: '14px'
        //     }
        // })
    }

    return (
        <Dialog open={isOpen} onClose={handleOnClose}>
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel className="max-w-3xl w-full max-h-4/5 bg-white rounded-2xl">
                    <header className="border-b-2 border-border p-6">
                        <DialogTitle className="text-lg font-semibold">{mode === "create" ? "Add Client" : "Edit Client"}</DialogTitle>
                    </header>

                    <div className="overflow-y-auto max-h-[calc(80vh-6rem)] scrollbar-thin scrollbar-thumb-primary scrollbar-track-background-light">
                        <main className="py-6">
                            <FormProvider {...methods}>
                                <form onSubmit={handleSubmit(onSubmit)} id="form-add-client">
                                    <section className="flex justify-center items-start gap-4 mb-4 px-4 flex-1">
                                        <div>
                                            <Input 
                                                value={clientToEdit?.client_name ? clientToEdit.client_name : ""}
                                                type="text" 
                                                title="Client Name" 
                                                id="client-name" 
                                                validation="client_name" 
                                                labelClass="text-text-secondary text-sm" 
                                                inputClass="bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 border-border px-4 py-1" 
                                            />
                                        </div>

                                        <div>
                                            <Input 
                                                value={clientToEdit?.project_name ? clientToEdit.project_name : ""}
                                                type="text" 
                                                title="Project Name" 
                                                id="project-name" 
                                                validation="project_name" 
                                                labelClass="text-text-secondary text-sm" 
                                                inputClass="bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 border-border px-4 py-1" 
                                            />
                                        </div>

                                        <div>
                                            <Select 
                                                name="status" 
                                                id="project-status" 
                                                title="Project Status" 
                                                validation="project_status" 
                                                options={PROJECT_STATUS} 
                                                labelClass="text-text-secondary text-sm" 
                                                selectClass="bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 border-border px-4 py-1" 
                                                value={clientToEdit?.project_status ? clientToEdit.project_status : "Pending"}
                                            />
                                        </div>

                                        <div>
                                            <Input 
                                                value={clientToEdit?.due_date 
                                                    ? new Date(clientToEdit.due_date).toISOString().split("T")[0] 
                                                    : ""
                                                }
                                                type="date" 
                                                id="project-due-date" 
                                                title="Due Date" 
                                                validation="due_date" 
                                                labelClass="text-text-secondary text-sm" 
                                                inputClass="bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 border-border px-4 py-1" 
                                            />
                                        </div>
                                    </section>
                                </form>
                            </FormProvider>
                        </main>

                        <footer className="border-t-2 border-border p-4 flex justify-end items-center gap-4 bg-card sticky bottom-0 shrink-0 rounded-b-2xl">
                            <button type="button" onClick={() => handleOnClose()} className="bg-background-light text-text-primary rounded-2xl px-4 py-2 cursor-pointer">Cancel</button>
                            <button 
                                type="submit" 
                                form="form-add-client" 
                                className="bg-primary text-card rounded-2xl px-4 py-2 cursor-pointer"
                            >
                                {mode === "create" ? "Add Client" : "Save Changes"}
                            </button>
                        </footer>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}