import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import type { Clients } from "@features/clients/types/clients";
import { useClientsStore } from "@/store/useClientsStore";
import { useRecipesStore } from "@/store/useRecipesStore";
import type { Recipes } from "@/features/recipes/types";

interface ModalConfirmationProps {
    isOpen: boolean
    onConfirm: () => void
    onCancel: () => void
    mode: "delete" | "status"
    section: "recipes" | "clients"
    clientID?: Clients["client_id"]
    recipeID?: Recipes["id"]
}

export default function ModalConfirmation({ 
    isOpen, 
    onConfirm, 
    onCancel,
    mode,
    section,
    clientID,
    recipeID
}: ModalConfirmationProps) {

    const { clients } = useClientsStore()
    const { recipes } = useRecipesStore()

    const clientName = clients.filter((client) => client.client_id === clientID)
    const recipeTitle = recipes.filter((recipe) => recipe.id === recipeID )

    let title = ""

    if (section === "clients") {
        title = mode === "status" 
            ? "Invoice Status" 
            : "Delete Client"
    } else if (section === "recipes") {
        title = mode === "delete" 
            ? "Delete Recipe"
            : "Change Status"
    }

    let confirmation = ""

    if (section === "clients") {
        confirmation = mode === "status" 
            ? "Are you sure you want to change the invoice status?"
            : `Are you sure you want to delete ${clientName[0].client_name}?`
    } else if (section === "recipes") {
        confirmation = mode === "delete"
            ? `Are you sure you want to delete ${recipeTitle[0].title}`
            : `Are you sure you want to change the status?`
    }  

    return (
        <Dialog open={isOpen} onClose={onCancel}>
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel className="w-full md:max-w-md max-h-4/5 bg-white rounded-2xl">
                    <header className="border-b-2 border-border p-6">
                        <DialogTitle className="text-lg font-semibold">
                            {title}
                        </DialogTitle>
                    </header>

                    <div className="overflow-y-auto max-h-[calc(80vh-6rem)] scrollbar-thin scrollbar-thumb-primary scrollbar-track-background-light">
                        <main className="py-6 flex justify-center text-center">
                            <h1 className="text-text-secondary">
                                { confirmation }
                            </h1>
                        </main>

                        <footer className="border-t-2 border-border p-4 flex justify-end items-center gap-4 bg-card sticky bottom-0 shrink-0 rounded-b-2xl">
                            <button 
                                type="button" 
                                onClick={onCancel} 
                                className="bg-background-light text-text-primary rounded-2xl px-4 py-2 cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button 
                                type="submit" 
                                onClick={onConfirm} 
                                className="bg-primary text-card rounded-2xl px-4 py-2 cursor-pointer"
                            >
                                { mode === "status" ? "Change" : "Confirm" }
                            </button>
                        </footer>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}