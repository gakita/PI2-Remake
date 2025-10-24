import express from "express"
import routes from "./src/routes/routes"

const app = express()


app.use(express.json())
app.use("/api", routes)
// app.use(errorHandler)


// app.get("/api/users/:id", async(req,res) =>{
//     try{
//         const id = parseInt(req.params.id)
        
//         const user = await prisma.user.findUnique({
//             where: {
//                 id: id
//             }
//         })
//         if (!user){
//             return res.status(404).json("User not found")
//         }
//         return res.status(200).json(user)
//     }catch(error){
//         console.log(error)
//         return res.status(500).json(error)
//     }
// })

export default app