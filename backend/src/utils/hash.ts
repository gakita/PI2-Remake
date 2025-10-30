import * as bcrypt from "bcrypt"
import "dotenv/config"

const salts = process.env.SALTS

const saltsNum = Number(salts)

export const hashPassword = async (password: string) => {
    try{
        const hash = await bcrypt.hash(password,saltsNum)
        return hash
    }catch(error){
        throw new Error("Error hashing password")
    }
}

export const comparePassword = async (password: string, hash: string) => {
    if(!salts){
        throw new Error("Salts not found")
    }
    return await bcrypt.compare(password, hash)
}