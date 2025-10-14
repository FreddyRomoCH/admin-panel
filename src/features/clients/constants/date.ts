export function dateFormatted(dueDate?: string | null) {
    if (!dueDate) return "-"
    
    const date = new Date(dueDate)
    const formatted = date.toLocaleDateString("es-ES")

    return formatted
}