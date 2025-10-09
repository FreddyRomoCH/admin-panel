export function toSlug(title:string) {
    const titleSlug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "")

    return titleSlug
}