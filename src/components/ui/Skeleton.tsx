export default function Skeleton() {
    return (
        <div className="flex items-center gap-4 p-3 rounded-md bg-card animate-pulse">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded-md w-3/4 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded-md w-1/2"></div>
            </div>
        </div>
    )
}