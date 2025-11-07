export default function Spinning () {

    return (
        <div className="flex justify-center items-center bg-card dark:bg-card-dark h-screen">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-primary dark:border-background-base h-16 w-16  animate-pulse"></div>
        </div>
    )
}