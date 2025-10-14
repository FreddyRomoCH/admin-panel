export const PROJECT_STATUS = [
    { value: "paid", label: "Paid", bg: "bg-green-100", text: "text-green-700" },
    { value: "pending", label: "Pending", bg: "bg-yellow-100", text: "text-yellow-700" },
    { value: "overdue", label: "Overdue", bg: "bg-red-100", text: "text-red-700"},
    { value: "free", label: "Free", bg: "bg-blue-100", text: "text-blue-700"  }
]

export interface Status {
    value: string
    label: string
    bg: string
    text: string
}