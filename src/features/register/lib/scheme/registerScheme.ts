import { z } from "zod"

export const registerScheme = z.object({
    first_name: z
        .string()
        .trim()
        .min(1, "First Name is required")
        .max(20, "First name must be at most 20 characters"),

    last_name: z
        .string()
        .trim()
        .min(1, "Last name is required")
        .max(20, "Last name must be at most 20 characters"),

    username: z
        .string()
        .trim()
        .min(1, "Username is required"),

    email: z
    .email("Invalid email address")
    .trim()
    .min(1, "Email is required"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(32, "Password must be at most 32 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
            /[@$!%*?&]/,
            "Password must contain at least one special character (@, $, !, %, *, ?, &)"
    ),

    is_admin: z.boolean(),
})

export type RegisterSchemeType = z.infer<typeof registerScheme>