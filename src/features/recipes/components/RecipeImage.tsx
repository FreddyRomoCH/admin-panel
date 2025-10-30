import { useEffect, useState } from "react"
import type { Recipes } from "../types"
import { supabase } from "@/lib/supabaseClient"
import { useFormContext } from "react-hook-form"

interface RecipeImageProps {
    mainImage: Recipes["main_image"],
    title: Recipes["title"]
}

export default function RecipeImage({ mainImage, title }: RecipeImageProps) {
    const [recipeImage, setRecipeImage] = useState<RecipeImageProps["mainImage"]>(mainImage)
    const {setValue, formState: {errors}} = useFormContext()

    useEffect(() => {
        setRecipeImage(mainImage)
    }, [mainImage])

    const handleChangeImage = async (newImage: React.ChangeEvent<HTMLInputElement>) => {
        const file = newImage.target.files?.[0]
        if (!file) return

        const fileName = `${Date.now()}-${file.name}`

        // We upload the file to Supabase storage folder
        const { error } = await supabase.storage
            .from("recipes")
            .upload(fileName, file)

        if (error) {
            console.log("Error uploading file", error.message)
            return
        }
        
        // Obtein public URL
        const { data: publicUrl } = supabase.storage
            .from("recipes")
            .getPublicUrl(fileName)

        if (publicUrl?.publicUrl) {
            setRecipeImage(publicUrl.publicUrl)
            setValue("main_image", publicUrl.publicUrl, { shouldValidate: true })
        }
    }

    return (
        <div className={`relative bg-background-light w-full max-w-52 aspect-square flex flex-col justify-center items-center rounded-lg border-2 ${errors.main_image ? "border-red-600" : "border-border"} border-dashed`}>
            {recipeImage && (
                <img id="recipe-image" className="aspect-square h-24 rounded-2xl object-cover" src={recipeImage} alt={title} />
            )}
            <input className="absolute text-text-secondary text-xs text-center cursor-pointer inset-0 w-full h-full" type="file" accept="image/*" onChange={(e) => handleChangeImage(e)} />

            {errors.main_image && (
                <p className="text-red-600 text-xs mt-1">
                    {String(errors.main_image.message)}
                </p>
            )}
        </div>
    )
}