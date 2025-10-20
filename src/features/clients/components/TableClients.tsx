// import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select"
import { dateFormatted } from "@/features/clients/constants/date"
import { PROJECT_STATUS, type Status } from "@features/clients/constants/status"
import type { Clients } from "@features/clients/types/clients"
// import { useState } from "react"
// import ModalStatusChange from "@features/clients/components/ModalStatusChange"

interface TableClientsProps {
    value: string
    found: Status
    client: Clients
    handleChangeOut: (val: string, draft: string, clientId?: number) => void
}

export default function TableClients({ found, client, handleChangeOut, value }: TableClientsProps) {

    return (
        <>
        <tr key={client.project_name}>
            <td className="px-4 py-2">
                <h2 className="font-normal text-text-primary">{client.client_name}</h2>
            </td>

            <td className="px-4 py-2 text-text-secondary text-sm">
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

            <td className="px-4 py-2 text-text-secondary text-sm">
                <p>{ dateFormatted(client.due_date) }</p>
            </td>
        </tr>
        </>
    )
}