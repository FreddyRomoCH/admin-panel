interface ProjectsPaginationProps {
    totalPages: number,
    currentPage: number,
    onPageChange: (page:number) => void
}

export default function ProjectsPagination({totalPages, currentPage, onPageChange}:ProjectsPaginationProps) {
    return (
        <>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                    key={num}
                    onClick={() => onPageChange(num)}
                    className={`w-8 h-8 text-center rounded-full cursor-pointer text-sm ${
                    num === currentPage ? "bg-primary text-white" : "bg-gray-100 text-gray-700"
                    }`}
                >
                    {num}
                </button>
            ))}
        </>
    )
}