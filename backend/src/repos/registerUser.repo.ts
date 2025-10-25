import { PrismaClient} from "@prisma/client"

const p = new PrismaClient()

export const userRepo = {
    async createUser(
        data:{
            name: string,
            email: string,
            password: string
        }
    ){
        return p.user.create({ data })
    }
}