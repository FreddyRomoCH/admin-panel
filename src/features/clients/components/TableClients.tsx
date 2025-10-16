// import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select";
import { dateFormatted } from "@/features/clients/constants/date";
import {
    PROJECT_STATUS,
    type Status,
} from "@features/clients/constants/status";
import type { Clients } from "@features/clients/types/clients";

interface TableClientsProps {
    found: Status;
    client: Clients;
}

export default function TableClients({ found, client }: TableClientsProps) {

    return (
        <tr key={client.project_name}>
        <td className="px-4 py-2">
            <h2 className="font-normal text-text-primary">{client.client_name}</h2>
        </td>

        <td className="px-4 py-2 text-text-secondary text-sm">
            <p>{client.project_name}</p>
        </td>

        <td className="px-4 py-2">
            <Select
            name="select-status"
            id="select-status"
            options={PROJECT_STATUS}
            value={found.value}
            selectClass={`rounded-lg px-6 py-1 cursor-pointer hover:scale-105 transform transition-transform duration-150 ease-in-out`}
            client_id={client.project_id}
            />
        </td>

        <td className="px-4 py-2 text-text-secondary text-sm">
            <p>{dateFormatted(client.due_date)}</p>
        </td>
        </tr>
    );
}
