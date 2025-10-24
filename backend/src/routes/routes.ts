import express from "express"
import { registerPlaneController } from "../controller/registerPlaneController"
import { registerUserController } from "../controller/registerUserController"
import { getAllUsersController } from "../controller/getAllUsersController"
import { getAllPlanesController } from "../controller/getAllPlanesController"
import { registerCityController } from "../controller/registerCityController"

const router = express.Router()

// Registrar Aviao
router.post("/registerPlane", registerPlaneController)

// Registrar Usuario
router.post("/registerUser", registerUserController)

// Registrar Cidade
router.post("/registerCity", registerCityController)

// Listar Usuarios
router.get("/users", getAllUsersController)

// Listar Avioes
router.get("/planes", getAllPlanesController)

export default router