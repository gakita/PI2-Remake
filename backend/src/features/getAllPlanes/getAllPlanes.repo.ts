import { PrismaClient } from "@prisma/client"

const p = new PrismaClient()

export const getAllPlanesRepo = () => {
    return p.plane.findMany()
}
