import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface ModalStatusChangeProps {
    isOpen: boolean
    onConfirm: () => void
    onCancel: () => void
}

export default function ModalStatusChange({ isOpen, onConfirm, onCancel }: ModalStatusChangeProps) {

    return (
        <Dialog open={isOpen} onClose={onCancel}>
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel className="w-full md:max-w-md max-h-4/5 bg-white rounded-2xl">
                    <header className="border-b-2 border-border p-6">
                        <DialogTitle className="text-lg font-semibold">Invoice Status</DialogTitle>
                    </header>

                    <div className="overflow-y-auto max-h-[calc(80vh-6rem)] scrollbar-thin scrollbar-thumb-primary scrollbar-track-background-light">
                        <main className="py-6 flex justify-center text-center">
                            <h1 className="text-text-secondary">Are you sure you want to change the invoice status?</h1>
                        </main>

                        <footer className="border-t-2 border-border p-4 flex justify-end items-center gap-4 bg-card sticky bottom-0 shrink-0 rounded-b-2xl">
                            <button type="button" onClick={onCancel} className="bg-background-light text-text-primary rounded-2xl px-4 py-2 cursor-pointer">Cancel</button>
                            <button type="submit" onClick={onConfirm} form="form-add-client" className="bg-primary text-card rounded-2xl px-4 py-2 cursor-pointer">Change</button>
                        </footer>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}