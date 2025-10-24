import { planeRepo } from "../repos/plane.repo";

export const registerPlaneService = async (data: {producer: string, model: string}) =>{
    try {
        if (data.producer.trim() === "" || data.model.trim() === "") {
            throw new Error("Invalid data")   
        }
        const plane = await planeRepo.createPlane(data)
        return plane
    } catch (error) {
        console.log(error)
        throw new Error ("Error creating plane")
    }
}