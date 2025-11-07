import Skeleton from "@/components/ui/Skeleton";
import Spinning from "./Spinning";

interface LoadingProps {
    length: number
    direction: "rows" | "cols"
    loader?: "skeleton" | "spinner" | null
}

export default function Loading({ 
    length,
    direction,
    loader
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
                loader === "skeleton" || !loader ? (
                    <div key={i}><Skeleton /></div>
                ) : (
                    <Spinning key={i} />
                )
            ))
        }
        </main>
    )
}