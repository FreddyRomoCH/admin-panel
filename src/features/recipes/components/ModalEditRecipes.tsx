import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import type { Recipes } from "@features/recipes/types"
import { PREP_TIME, type PrepTimeType } from "@features/recipes/lib/utils/getPrepTime"
import { COUNTRIES, type CountriesType } from "../lib/utils/getCountries"
import { useState } from "react"

interface ModalEditRecipesProps {
    isOpen: boolean,
    handleOnClose: () => void,
    recipe: Recipes
}

export default function ModalEditRecipes({ isOpen, handleOnClose, recipe }: ModalEditRecipesProps) {
    const {title, description, main_image, servings, prep_time, country} = recipe
    const [selectedTitle, setSelectedTitle] = useState<Recipes["title"]>(title)
    const [selectedDescription, setSelectedDescription] = useState<Recipes["description"]>(description)
    const [selectedCountry, setSelectedCountry] = useState<CountriesType["name"]>(country)
    const [selectedPrepTime, setSelectedPrepTime] = useState<PrepTimeType["value"]>(prep_time)
    const [selectedServings, setSelectedServings] = useState<number>(servings)

    const handleChangeTitle = (t: Recipes["title"]) => {
        setSelectedTitle(t)
    }

    const handleChangeDescription = (d: Recipes["description"]) => {
        setSelectedDescription(d)
    }

    const handleChangeCountry = (c: CountriesType["name"]) => {
        setSelectedCountry(c)
    }

    const handleChangePrepTime = (t: PrepTimeType["value"]) => {
        setSelectedPrepTime(t)
    }

    const handleChangeServings = (s: number) => {
        setSelectedServings(s)
    }

    return (
        <Dialog open={isOpen} onClose={handleOnClose}>
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center">
                {/* <Button onClick={handleOnClose}>Close Recipe</Button> */}
                <DialogPanel className="max-w-xl w-full bg-white rounded-2xl">
                    <header className="border-b-2 border-border p-6">
                        <DialogTitle className="text-lg font-semibold">Edit Recipe</DialogTitle>
                    </header>
                    <main className="p-6">
                        <form action="">
                            <section className="flex justify-between items-start gap-4 mb-4">
                                <div className="bg-background-light w-full max-w-52 aspect-square flex justify-center items-center rounded-lg border-2 border-border border-dashed">
                                    <img className="aspect-square h-16 rounded-2xl object-cover" src={main_image} alt={title} />
                                </div>

                                <div className="flex flex-col justify-start items-left gap-4 w-full">
                                    <div>
                                        <label htmlFor="title" className="text-text-secondary text-sm">Name</label>
                                        <input className="bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 border-border px-4 py-1" id="title" type="text" value={selectedTitle} onChange={(e) => handleChangeTitle(e.target.value)} />
                                    </div>

                                    <div>
                                        <label htmlFor="description" className="text-text-secondary text-sm">Description</label>
                                        <textarea value={selectedDescription} onChange={(e) => handleChangeDescription(e.target.value)} name="description" id="description" className="bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 border-border px-4 py-1" />
                                    </div>
                                </div>
                            </section>

                            <section className="grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-4">
                                    <div>
                                        <label htmlFor="servings" className="text-text-secondary text-sm">Servings</label>
                                        <select value={selectedServings} onChange={(e) => handleChangeServings(Number(e.target.value))} name="servings" id="servings" className="bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 border-border px-4 py-1">
                                            {
                                                Array.from({ length: 21 }).map((_, i) => {
                                                    if (i !== 0) return <option key={i} value={i}>{i}</option>
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="prep_time" className="text-text-secondary text-sm">Prep Time</label>
                                        <select value={selectedPrepTime} onChange={(e) => handleChangePrepTime(Number(e.target.value))} name="prep_time" id="prep_time" className="bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 border-border px-4 py-1">
                                            {
                                                PREP_TIME.map((time: PrepTimeType) => (
                                                    <option key={time.value} value={time.value}>{time.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="country" className="text-text-secondary text-sm">Country</label>
                                        <select value={selectedCountry} onChange={(e) => handleChangeCountry(e.target.value)} name="country" id="country" className="bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 border-border px-4 py-1">
                                            {
                                                COUNTRIES.map((country: CountriesType) => (
                                                    <option key={country.value} value={country.name}>{country.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                            </section>
                        </form>
                    </main>
                </DialogPanel>
            </div>
        </Dialog>
    )
}