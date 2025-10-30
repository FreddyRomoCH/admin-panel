// import Button from "@/components/ui/Button"
import IconEdit from "@/assets/IconEdit"
import IconClose from "@/assets/icons/IconClose"
import Select from "@/components/ui/Select"
import { dateFormatted } from "@/features/clients/constants/date"
import { PROJECT_STATUS, type Status } from "@features/clients/constants/status"
import type { Clients } from "@features/clients/types/clients"

interface TableClientsProps {
    value: string
    found: Status
    client: Clients
    handleChangeOut: (val: string, draft: string, clientId?: number) => void
    handleClickEditClient: (client: Clients) => void
    handleClickDeleteClient: (client_id: Clients["client_id"]) => void
}

export default function TableClients({ 
    found, 
    client, 
    handleChangeOut, 
    value, 
    handleClickEditClient, 
    handleClickDeleteClient 
}: TableClientsProps) {

    return (
        <>
        <tr key={client.project_name}>
            <td className="px-4 py-2">
                <h2 className="font-normal text-text-primary dark:text-text-secondary-dark">{client.client_name}</h2>
            </td>

            <td className="px-4 py-2 text-text-secondary dark:text-text-secondary-dark text-sm">
                <p>{ client.project_name }</p>
            </td>

            <td className="px-4 py-2">
                <Select 
                    name="select-status" 
                    id={`select-status-${client.project_id}`} 
                    options={PROJECT_STATUS} 
                    value={value} 
                    selectClass={`
                        ${found.bg ?? ""} 
                        ${found.text ?? ""}
                        rounded-lg px-6 py-1 cursor-pointer hover:scale-105 transform transition-transform duration-150 ease-in-out`}
                    client_id={client.project_id}
                    handleChangeOut={(val, draft) => handleChangeOut(val, draft, client.project_id)}
                />
            </td>

            <td className="px-4 py-2 text-text-secondary dark:text-text-secondary-dark text-sm">
                <p>{ dateFormatted(client.due_date) }</p>
            </td>

            <td className="px-4 py-2">
                <button 
                    className="cursor-pointer"
                    onClick={() => handleClickEditClient(client)}
                >
                    <IconEdit className="text-text-secondary dark:text-text-secondary-dark" />
                </button>
            </td>

            <td className="px-4 py-2">
                <button 
                    className="cursor-pointer"
                    onClick={() => handleClickDeleteClient(client.client_id)}
                >
                    <IconClose className="text-red-600 w-6 h-6" />
                </button>
            </td>
        </tr>
        </>
    )
}