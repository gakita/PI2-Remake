import { PrismaClient} from "@prisma/client"

const p = new PrismaClient()

export const createPlaneRepo = {
    async createPlane(
        data: {
            producer: string,
            model: string
        }
    ){
        return p.plane.create({ data })
    }
}