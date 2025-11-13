import type { TypeError } from "@/types/error";
import Button from "@components/ui/Button";

interface ErrorProps {
    type: TypeError["type"]
}

export default function Error({ type }: ErrorProps) {

    const handleRetry = () => {
        window.location.reload()
    }

    if (type === "section") {
        return (
            <div className="flex flex-col justify-center items-center w-full">
                <h4 className="text-red-700 text-lg font-bold">Oops! we are unable to fetch your data</h4>
                <nav className="flex justify-between items-center gap-2">
                    <Button 
                        handleClick={handleRetry} 
                        title="Retry" 
                        titleCss="text-text-secondary text-sm" 
                        buttonCss="flex justify-center items-center gap-2 bg-gray-300 px-4 py-2 rounded-lg cursor-pointer hover:scale-105 transform transition-transform duration-150 ease-in-out" 
                    />
                </nav>
            </div>
        )
    }

    if (type === "page") {
        return (
            <div className="flex flex-col justify-center items-center gap-6">
                <header className="flex flex-col justify-center items-center gap-2">
                    <h1 
                        className="text-3xl text-text-primary dark:text-text-secondary-dark font-bold text-center"
                    >
                        Oops! Something went wrong.
                    </h1>
                    <p 
                        className="text-base text-text-secondary dark:text-text-secondary-dark font-light md:w-lg mx-auto text-center"
                    
                    >We encountered an issue while fetching your data. Please try again in a few minutes
                    </p>
                </header>

                <main>
                    <nav className="flex justify-between items-center gap-2">
                        <Button 
                            handleClick={handleRetry} 
                            title="Retry" 
                            titleCss="text-text-secondary text-sm" 
                            buttonCss="flex justify-center items-center gap-2 bg-gray-300 px-4 py-2 rounded-lg cursor-pointer hover:scale-105 transform transition-transform duration-150 ease-in-out" 
                        />

                        <Button 
                            href="/" 
                            title="Go to Dashboard" 
                            titleCss="text-card text-sm" 
                            buttonCss="flex justify-center items-center gap-2 bg-primary px-4 py-2 rounded-lg cursor-pointer hover:scale-105 transform transition-transform duration-150 ease-in-out" 
                        />
                    </nav>
                </main>
                <footer>
                    <p className="text-text-secondary dark:text-text-secondary-dark font-light text-sm">
                        If the problem persists, 
                        <a 
                            href="mailto:freddyromoch@gmail.com" 
                            className="text-primary"
                        >
                            contact support
                        </a>
                    </p>
                </footer>
            </div>
        )
    }

    return null
}