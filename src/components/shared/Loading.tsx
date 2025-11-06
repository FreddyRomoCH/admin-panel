import Skeleton from "@/components/ui/Skeleton";

interface LoadingProps {
    length: number
    direction: "rows" | "cols"
}

export default function Loading({ 
    length,
    direction
}: LoadingProps
) {

    const gridClass = 
        direction === "rows"
            ? { gridTemplateRows: `repeat(${length}, minmax(0, 1fr))` }
            : { gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))` }

    return (
        <main 
            className="grid justify-center items-center gap-2 w-full"
            style={gridClass}
        >
        {
            Array.from({ length: length }).map((_, i) => (
                <div key={i}><Skeleton /></div>
            ))
        }
        </main>
    )
}