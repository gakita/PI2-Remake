import express from "express"
import routes from "./src/routes/routes"

const app = express()


app.use(express.json())
app.use("/api", routes)
// app.use(errorHandler)

export default app