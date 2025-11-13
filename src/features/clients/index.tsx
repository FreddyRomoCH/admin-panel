import { useClientsStore } from "@/store/useClientsStore"
import type { Clients } from "@features/clients/types/clients"
import { useEffect, useState } from "react"
import { PROJECT_STATUS, type Status } from "@features/clients/constants/status"
import Error from "@/components/shared/Error"
import TableClients from "@features/clients/components/TableClients"
import ModalConfirmation from "@/features/clients/components/ModalConfirmation"
import toast from "react-hot-toast"
import ModalClientForm from "@features/clients/components/ModalClientForm"
import Loading from "@/components/shared/Loading"
import { useTranslation } from "react-i18next"
import { useAuthStore } from "@/store/useAuthStore"

export default function Clients() {
    const {loading, error, showClients, clients, changePaymentStatus, deleteClient} = useClientsStore()
    const { user } = useAuthStore()
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
    const [previousValue, setPreviousValue] = useState("")
    const [draftValue, setDraftValue] = useState("")
    const [selectedClientId, setSelectedClientId] = useState<number>(0)
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
    const [selectedClient, setSelectedClient] = useState<Clients | null>(null)

    useEffect(() => {
        showClients()
    }, [])

    if (error && !previousValue) 
        return <Error type="page" />

    if (loading) 
        return <Loading direction="cols" length={4} />

    const onChangeSelect = (newValue: string, oldValue: string, clientID: number) => {
        setPreviousValue(oldValue)
        setDraftValue(newValue)
        setSelectedClientId(clientID)
        setIsOpen(true)
    }

    const onCancel = (mode: "delete" | "status") => {
        if (mode === "status") {
            setIsOpen(false)
            setDraftValue(previousValue)
        }

        if (mode === "delete") {
            setIsOpenDeleteModal(false)
        }

        // Clean the temporary states globally
        setSelectedClientId(0)
        setPreviousValue("")
        setDraftValue("")
    }

    const onConfirm = async (mode: "delete" | "status") => {
        let success

        if (mode === "status") {
            setIsOpen(false)
            success = await changePaymentStatus(selectedClientId, draftValue)
        }

        if (mode === "delete") {
            setIsOpenDeleteModal(false)
            success = await deleteClient(selectedClientId)
        }
            
        if (!success) {
            toast.error(`Unable to ${mode === "status" ? t("save the new payment status") : t("delete the client")}. ${t("Try again later")}`, {
                style: {
                    color: '#c10008',
                    background: '#ffe2e3',
                    fontSize: '14px'
                }
            })
        }else{
            toast.success(`${mode === "status" ? t("New status changed") : t("Client deleted")} ${t("successfully")}!`, {
                style: {
                    background: "#defae6",
                    color: "#475569",
                    fontSize: "14px",
                }
            })
        }

        // Clean the temporary states globally
        setSelectedClientId(0)
        setPreviousValue("")
        setDraftValue("")
    }

    const handleClickEditClient = (client: Clients) => {
        setIsEditModalOpen(true)
        setSelectedClient(client)
    }

    const handleCloseModal = () => {
        setIsEditModalOpen(false)
    }

    const handleClickDeleteClient = (client_id: Clients["client_id"]) => {
        setIsOpenDeleteModal(true)
        setSelectedClientId(client_id)
    }

    return (
        <main className="flex flex-col justify-center items-center">
            <div className="overflow-y-auto max-h-[calc(80vh)] w-full scrollbar-thin scrollbar-thumb-primary scrollbar-track-background-light">
                <table className="w-full border-collapse text-sm tracking-wide font-light animate-blurred-fade-in">
                    <thead className="bg-background-light dark:bg-background-dark shadow rounded-t-2xl text-text-secondary dark:text-text-secondary-dark">
                        <tr>
                            <th className="px-4 py-2 text-left">{t("Client Name")}</th>
                            <th className="px-4 py-2 text-left">{t("Project")}</th>
                            <th className="px-4 py-2 text-left">{t("Invoice Status")}</th>
                            <th className="px-4 py-2 text-left">{t("Due Date")}</th>
                            <th className="px-4 py-2 text-left">{t("Edit")}</th>
                            <th className="px-4 py-2 text-left">{t("Delete")}</th>
                        </tr>
                    </thead>

                    <tbody className="bg-card dark:bg-card-dark text-text-primary dark:text-text-secondary-dark font-inter">
                        {
                            clients && clients.map((client: Clients) => {
                                const isClientFromUser = user?.id === client.user_id
                                if ( !isClientFromUser ) return

                                const isEdited = client.project_id === selectedClientId
                                const currentValue = isEdited ? draftValue : client.project_status
                                
                                const statusFound = PROJECT_STATUS.find((s: Status) => s.value === currentValue)
                                ?? {
                                    value: "unknown",
                                    label: "Unknown",
                                    bg: "bg-gray-200",
                                    text: "text-gray-600",
                                }
                        
                                return (
                                    <TableClients 
                                        key={client.project_id}
                                        value={currentValue}
                                        found={statusFound} 
                                        client={client} 
                                        handleChangeOut={(val, oldVal) => onChangeSelect(val, oldVal, client.project_id)}
                                        handleClickEditClient={() => handleClickEditClient(client)}
                                        handleClickDeleteClient={() => handleClickDeleteClient(client.client_id)}
                                    />
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            {isOpen && (
                <ModalConfirmation
                    isOpen={isOpen}
                    onConfirm={() => onConfirm("status")}
                    onCancel={() => onCancel("status")}
                    mode="status"   
                    section="clients"
                />
            )}

            {isOpenDeleteModal && (
                <ModalConfirmation
                    isOpen={isOpenDeleteModal}
                    onConfirm={() => onConfirm("delete")}
                    onCancel={() => onCancel("delete")}
                    mode="delete"   
                    section="clients"
                    clientID={selectedClientId}
                />
            )}

            {isEditModalOpen && (
                <ModalClientForm 
                    isOpen={isEditModalOpen} 
                    handleOnClose={handleCloseModal} 
                    mode="edit"
                    clientToEdit={selectedClient}
                />
            )}
        </main>
    )
}