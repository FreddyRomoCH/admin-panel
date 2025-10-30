import IconNext from "@/assets/IconNext"
import IconPrev from "@/assets/IconPrev"
import Skeleton from "@/components/ui/Skeleton"

interface ProjectsPaginationProps {
    totalPages: number,
    currentPage: number,
    onPageChange: (page:number) => void,
    hasMore: boolean,
    loading: boolean,
    onNextPage: () => void,
    onPrevPage: () => void
}

export default function ProjectsPagination({totalPages, currentPage, onPageChange, hasMore, loading, onNextPage, onPrevPage}:ProjectsPaginationProps) {
    return (
        loading ? (
            <Skeleton />
        ) : (
            <>
                <button 
                    className="cursor-pointer disabled:opacity-50 animate-slide-in-bottom" 
                    onClick={() => onPrevPage()} 
                    disabled={currentPage === 1 || loading}
                >
                    <IconPrev 
                        color="text-primary" 
                    />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                        key={num}
                        onClick={() => onPageChange(num)}
                        className={`w-8 h-8 text-center rounded-full cursor-pointer text-sm animate-slide-in-bottom ${
                        num === currentPage ? "bg-primary text-white" : "bg-gray-100 dark:bg-card-dark text-gray-700"
                        }`}
                    >
                        {num}
                    </button>
                ))}

                <button 
                    className="cursor-pointer disabled:opacity-50 animate-slide-in-bottom" 
                    onClick={() => onNextPage()} 
                    disabled={!hasMore || loading}
                >
                    <IconNext color="text-primary" />
                </button>
            </>
        )
    )
}