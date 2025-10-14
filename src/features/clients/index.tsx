import { useClientsStore } from "@/store/useClientsStore"
import type { Clients } from "@features/clients/types/clients"
import { useEffect } from "react"
import { PROJECT_STATUS, type Status } from "@features/clients/constants/status"
import { dateFormatted } from "@/features/clients/constants/date"

export default function Clients() {
    const {showClients, clients} = useClientsStore()

    useEffect(() => {
        showClients()
    }, [])
            
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

                                return (
                                    <tr key={client.project_name}>
                                        <td className="px-4 py-2">
                                            <h2 className="font-normal text-text-primary">{client.client_name}</h2>
                                        </td>

                                        <td className="px-4 py-2 text-text-secondary text-sm">
                                            <p>{ client.project_name }</p>
                                        </td>

                                        <td className="px-4 py-2">
                                            <button type="button" className={`${statusFound?.bg} ${statusFound?.text} rounded-2xl px-6 py-1 cursor-pointer hover:scale-105 transform transition-transform duration-150 ease-in-out`}>
                                                <span>{ statusFound?.label }</span>
                                            </button>
                                        </td>

                                        <td className="px-4 py-2 text-text-secondary text-sm">
                                            <p>{ dateFormatted(client.due_date) }</p>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                </tbody>
            </table>
        </main>
    )
}