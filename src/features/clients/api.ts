import { supabaseClients } from "@/lib/supabaseClient";
import type { Clients } from "@/features/clients/types/clients";

interface ClientData {
    client: Clients
}

export async function addClientToBD({ client }: ClientData) {
    const { error: clientError, data: clientData } = await supabaseClients
        .from("clients")
        .insert({
            name: client.client_name
        })
        .select("id, name")

    if (clientError) throw clientError

    const { error: projectError, data: projectData } = await supabaseClients
        .from("projects")
        .insert({
            name: client.project_name,
            client_id: clientData[0].id
        })
        .select("id, name")

    if (projectError) throw projectError

    const {error: paymentError, data: paymentsData} = await supabaseClients
        .from("Payments")
        .insert({
            id_project: projectData[0].id,
            status: client.project_status,
            due_date: client.due_date
        })
        .select("id_project, status, due_date")

    if (paymentError) throw paymentError

    return {
        client_name: clientData[0].name,
        project_name: projectData[0].name,
        project_status: paymentsData[0].status,
        due_date: paymentsData[0].due_date,
        id_project: paymentsData[0].id_project 
    } as Clients
}

export async function fetchClientsFromBD() {
    const { error, data } = await supabaseClients
        .from("clients")
        .select(`
            name,
            projects (
                name,
                Payments (
                id_project,
                status,
                due_date
                )
            )
        `)
        .order("id", { ascending: false })

    if (error) throw error

    const flat = data.flatMap(client =>
        client.projects.map(project => {
            const payment = project.Payments?.[0]
            return {
                client_name: client.name,
                project_name: project.name,
                project_id: payment?.id_project,
                project_status: payment?.status ?? "",
                due_date: payment?.due_date ?? ""
            }
        })
    )

    return flat
}

export async function updatePaymentStatus(project_id: Clients["project_id"] | undefined, newStatus: string) {
    const {error, data} = await supabaseClients
        .from("Payments")
        .update({ status: newStatus })
        .eq("id_project", project_id)
        .select("*")

    if (error) throw error

    return data
}