import { z } from "zod";

export const clientSchema = z.object({
    client_name: z.string("Client can not be empty").min(1, "Name should have at least 1 character"),
    project_name: z.string("Project can not be empty").min(1, "Project should have at least 1 character"),
    project_status: z.string(),
    due_date: z.string().optional()
})

export type clientFormData = z.infer<typeof clientSchema>