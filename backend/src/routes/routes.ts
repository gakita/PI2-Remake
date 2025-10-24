import express from "express"
import { registerPlaneController } from "../controller/registerPlaneController"

const router = express.Router()

router.post("/registerPlane", registerPlaneController)

export default router