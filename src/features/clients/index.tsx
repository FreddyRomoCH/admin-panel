import { useClientsStore } from "@/store/useClientsStore"
import type { Clients } from "@features/clients/types/clients"
import { useEffect, useState } from "react"
import { PROJECT_STATUS, type Status } from "@features/clients/constants/status"
import Error from "@/components/shared/Error"
import Skeleton from "@/components/ui/Skeleton"
import TableClients from "@features/clients/components/TableClients"
import ModalStatusChange from "./components/ModalStatusChange"
import toast from "react-hot-toast"

export default function Clients() {
    const {loading, error, showClients, clients, changePaymentStatus} = useClientsStore()

    const [isOpen, setIsOpen] = useState(false)
    const [previousValue, setPreviousValue] = useState("")
    const [draftValue, setDraftValue] = useState("")
    const [selectedClientId, setSelectedClientId] = useState<number | undefined>(undefined)

    useEffect(() => {
        showClients()
    }, [])

    if (error && !previousValue) return <Error type="page" />

    if (loading) {
        return (
            <main className="flex justify-center items-center gap-2">
                {
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i}><Skeleton /></div>
                    ))
                }
            </main>
        )
    }

    const onChangeSelect = (newValue: string, oldValue: string, clientID?: number) => {
        setPreviousValue(oldValue)
        setDraftValue(newValue)
        setSelectedClientId(clientID ?? undefined)
        setIsOpen(true)
    }

    const onCancel = () => {
        setIsOpen(false)
        setDraftValue(previousValue)
    }

    const onConfirm = async () => {
        setIsOpen(false)
        const success = await changePaymentStatus(selectedClientId, draftValue)
        console.log(success)
        
        if (!success) {
            toast.error("Unable to save the new payment status. Try again later.", {
                style: {
                    color: 'rgb(193 0 8)',
                    background: 'rgb(255 226 227)'
                }
            })
            setDraftValue(previousValue)
        }else{
            toast.success("New status changed successfully!", {
                style: {
                    color: 'rgb(0 130 54)',
                    background: 'rgb(219 252 229)'
                }
            })
        }
    }
            
    return (
        <main className="flex flex-col justify-center items-center">
            <table className="w-full border-collapse text-sm tracking-wide font-light animate-blurred-fade-in">
                <thead className="bg-background-light shadow rounded-t-2xl text-text-secondary">
                    <tr>
                        <th className="px-4 py-2 text-left">Client Name</th>
                        <th className="px-4 py-2 text-left">Project</th>
                        <th className="px-4 py-2 text-left">Invoice Status</th>
                        <th className="px-4 py-2 text-left">Due Date</th>
                    </tr>
                </thead>

                <tbody className="bg-card text-text-primary font-inter">
                    {
                        clients && clients.map((client: Clients) => {
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
                                    key={client.project_name}
                                    value={currentValue}
                                    found={statusFound} 
                                    client={client} 
                                    handleChangeOut={(val, oldVal) => onChangeSelect(val, oldVal, client.project_id)}
                                />
                            )
                        })
                    }
                </tbody>
            </table>



            {isOpen && (
                <ModalStatusChange
                    isOpen={isOpen}
                    onConfirm={onConfirm}
                    onCancel={onCancel}    
                />
            )}
        </main>
    )
}