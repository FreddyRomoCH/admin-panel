import { z } from "zod"

export const loginScheme = z.object({
    email: z.email("Invalid Email address").min(1, "Email is required"),
    password: z.string("Password is required").min(6, "Password must be at least 6 characters").max(32, "Password must be at most 32 characters"),
})

export type LoginSheme = z.infer<typeof loginScheme>