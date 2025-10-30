import express from "express"
import routes from "./src/routes/routes"
// @ts-ignore
import cors from "cors"
import path from "path"
import { errorHandler } from "./src/middleware/errorHandler"
import { notFoundHandler } from "./src/middleware/notFoundHandler"

const app = express()

app.use(cors())
// Servir arquivos estáticos da pasta uploads
app.use('/api/uploads/', express.static(path.join(__dirname, 'uploads')))

app.use(express.json())
app.use("/api", routes)
app.use(errorHandler)
app.use(notFoundHandler)

export default app