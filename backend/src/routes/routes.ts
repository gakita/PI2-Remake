import express from "express"
import { registerPlaneController } from "../controller/registerPlaneController"
import { registerUserController } from "../controller/registerUserController"
import { getAllUsersController } from "../controller/getAllUsersController"
import { getAllPlanesController } from "../controller/getAllPlanesController"
import { registerCityController } from "../controller/registerCityController"
import { getUserByIDContrtoller} from "../controller/getUserByIDController"
import { getAllCitiesController } from "../controller/getAllCitiesController"

const router = express.Router()

// Registrar Aviao
router.post("/registerPlane", registerPlaneController)

// Registrar Usuario
router.post("/registerUser", registerUserController)

// Registrar Cidade
router.post("/registerCity", registerCityController)

// Listar Usuarios
router.get("/users", getAllUsersController)

// Buscar Usuario por ID
router.get("/users/:id", getUserByIDContrtoller)

// Listar Avioes
router.get("/planes", getAllPlanesController)

// Listar todas as cidades

router.get("/cities", getAllCitiesController)

export default router