import express from "express"
import routes from "./src/routes/routes"
// @ts-ignore
import cors from "cors"
import path from "path"

const app = express()
app.use(cors())

// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(express.json())
app.use("/api", routes)
// app.use(errorHandler)

export default app