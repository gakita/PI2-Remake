import express from "express"
import routes from "./src/routes/routes"

const app = express()


app.use(express.json())
app.use("/api", routes)
// app.use(errorHandler)

app.get("/api/getAllUsers", async(req,res) =>{
    try{
        const users = await prisma.user.findMany(
            {
                select: {
                    id : true,
                    name : true,
                    email : true,
                    createdAt : true
                },
                orderBy:{
                    id: "asc"
                }
            }
        )
        if (!users){
            return res.status(404).json("Users not found")
        }
        return res.status(200).json(users)
    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
})

app.get("/api/users/:id", async(req,res) =>{
    try{
        const id = parseInt(req.params.id)
        
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })
        if (!user){
            return res.status(404).json("User not found")
        }
        return res.status(200).json(user)
    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
})

app.get("/api/getAllPlanes", async(req,res) =>{
    try{
        const planes = await prisma.plane.findMany(
            {
                select: {
                    planeId : true,
                    producer : true,
                    model : true
                },
                orderBy:{
                    planeId: "asc"
                }
            }
        )
        if (!planes){
            return res.status(404).json("Planes not found")
        }
        return res.status(200).json(planes)
    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
})

// REGISTROS DE USUARIOS AVIOES CIDADES E TRAJETOS



app.post("/api/registerUser", async (req,res) =>{
    try{
        const {name, email, password} = req.body
        const createUser = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })
        return res.status(201).json(createUser)
    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
})

app.post("/api/registerCity", async (req,res) => {
    try{
        const {name, country, state} = req.body
        const createCity = await prisma.cities.create({
            data: {
                name,
                country,
                state
            }
        })
        return res.status(201).json(createCity)
    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
})

export default app