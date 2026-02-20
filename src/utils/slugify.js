export function slugify(text) {
    return text
        .toLowerCase()
        .trim() //remove whitespace from both ends
        .replace(/[^\w\s-]/g, '') //remove all non-word characters except spaces and hyphens
        .replace(/\s+/g, '-') //replace spaces with hyphens
}