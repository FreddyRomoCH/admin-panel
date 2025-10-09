interface IconArrowDownProps {
    color?: string
}

export default function IconArrowDown({color}:IconArrowDownProps) {
    return (
        <svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none h-4 w-4 ${color ? color : "text-text-secondary"}`}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7l5 5l5 -5" /><path d="M7 13l5 5l5 -5" /></svg>
    )
}