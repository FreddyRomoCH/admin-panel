import { useClientsStore } from "@/store/useClientsStore"
import type { Clients } from "@features/clients/types/clients"
import { useEffect } from "react"
import { PROJECT_STATUS, type Status } from "@features/clients/constants/status"
import Error from "@/components/shared/Error"
import Skeleton from "@/components/ui/Skeleton"
import TableClients from "@features/clients/components/TableClients"

export default function Clients() {
    const {loading, error, showClients, clients} = useClientsStore()

    useEffect(() => {
        showClients()
    }, [])

    if (error) return <Error type="page" />

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
                            const statusFound = PROJECT_STATUS.find((s: Status) => s.value === client.project_status)
                            ?? {
                                value: "unknown",
                                label: "Unknown",
                                bg: "bg-gray-200",
                                text: "text-gray-600",
                            }
                    
                            return (
                                <TableClients key={client.project_name} found={statusFound} client={client} />
                            )
                        })
                    }
                </tbody>
            </table>
        </main>
    )
}