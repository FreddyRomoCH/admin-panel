import { supabaseClients } from "@/lib/supabaseClient";
import type { Clients, NewClient } from "@/features/clients/types/clients";
import type { UserType } from "@/types/users";

interface ClientData {
    client: NewClient
}

export async function addClientToBD({ client }: ClientData, user_id: UserType["id"]) {
    const { error: clientError, data: clientData } = await supabaseClients
        .from("clients")
        .insert({
            name: client.client_name,
            user_id
        })
        .select("id, name, user_id")

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
        client_id: clientData[0].id,
        client_name: clientData[0].name,
        user_id: clientData[0].user_id,
        project_name: projectData[0].name,
        project_status: paymentsData[0].status,
        due_date: paymentsData[0].due_date,
        project_id: paymentsData[0].id_project 
    } as Clients
}

export async function fetchClientsFromBD() {
    const { error, data } = await supabaseClients
        .from("clients")
        .select(`
            id,
            name,
            user_id,
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
                client_id: client.id,
                client_name: client.name,
                user_id: client.user_id,
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

    return data ?? []
}

export async function updateClientFromDB(client: Clients) {
    const {error: clientError} = await supabaseClients
        .from("clients")
        .update({
            name: client.client_name
        })
        .eq("id", client.client_id)

    if (clientError) throw clientError

    const { error: projectError } = await supabaseClients
        .from("projects")
        .update({
            name: client.project_name
        })
        .eq("id", client.project_id)

    if (projectError) throw projectError

    const { error: paymentError } = await supabaseClients
        .from("Payments")
        .update({
            status: client.project_status,
            due_date: client.due_date
        })
        .eq("id_project", client.project_id)
        .select("id_project, status, due_date")
        .single()

    if (paymentError) throw paymentError

    return {
        client_id: client.client_id,
        client_name: client.client_name,
        project_name: client.project_name,
        project_status: client.project_status,
        due_date: client.due_date,
        project_id: client.project_id
    } as Clients
}

export async function deleteClientFromDB(clientID: Clients["client_id"]) {

    // GET PROJECT ID TO DELETE PAYMENTS INFO
    const { error: projectSelectError, data: projectData } = await supabaseClients
        .from("projects")
        .select("id")
        .eq("client_id", clientID)

    if (projectSelectError) throw projectSelectError

    // DELETE PAYMENT
    const { error: paymentError } = await supabaseClients
        .from("Payments")
        .delete()
        .eq("id_project", projectData[0].id)

    if (paymentError) throw paymentError

    // DELETE PROJECT
    const { error: projectError } = await supabaseClients
        .from("projects")
        .delete()
        .eq("client_id", clientID)

    if (projectError) throw projectError

    // DELETE CLIENT
    const { error: clientError } = await supabaseClients
        .from("clients")
        .delete()
        .eq("id", clientID)

    if (clientError) throw clientError

    if (!paymentError && !projectError && !clientError) return true
}