import Skeleton from "@/components/ui/Skeleton";

interface LoadingProps {
    length: number
}

export default function Loading(
    { length }: LoadingProps
) {

    return (
        <main 
            className={`grid grid-cols-${length} justify-center items-center gap-2 w-full`}
        >
        {
            Array.from({ length: length }).map((_, i) => (
                <div key={i}><Skeleton /></div>
            ))
        }
        </main>
    )
}