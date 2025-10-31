import { getTripByNameRepo } from "./getTripByName.repo";

export const getTripByNameService = async ({origin,destiny}: {origin:string,destiny:string}) => {
    return getTripByNameRepo({origin,destiny})
}