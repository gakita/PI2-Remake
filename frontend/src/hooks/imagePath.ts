const apiURL = import.meta.env.VITE_API_URL

export const imagePath = (path:string) =>{
    return `${apiURL}/uploads/${path}`
}