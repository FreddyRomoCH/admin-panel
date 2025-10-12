import { useState } from "react"
import { COUNTRIES, type CountriesType } from "@features/recipes/lib/utils/getCountries"
import type { Recipes } from "../types"

interface RecipeCountryProps {
    country: Recipes["country"]
}

export default function RecipeCountry ({country}: RecipeCountryProps) {
    const [selectedCountry, setSelectedCountry] = useState<CountriesType["name"]>(country)

    const handleChangeCountry = (c: CountriesType["name"]) => {
        setSelectedCountry(c)
    }
    return (
        <>
            <label htmlFor="country" className="text-text-secondary text-sm">Country</label>
            <select value={selectedCountry} onChange={(e) => handleChangeCountry(e.target.value)} name="country" id="country" className="bg-background-light text-text-primary font-light text-sm w-full rounded-lg border-2 border-border px-4 py-1">
                {
                    COUNTRIES.map((country: CountriesType) => (
                        <option key={country.value} value={country.name}>{country.name}</option>
                    ))
                }
            </select>
        </>
    )
}