import express from "express"
import { registerPlaneController } from "../controller/registerPlaneController"
import { registerUserController } from "../controller/registerUserController"
import { getAllUsersController } from "../controller/getAllUsersController"
import { getAllPlanesController } from "../controller/getAllPlanesController"
import { registerCityController } from "../controller/registerCityController"
import { getUserByIDContrtoller} from "../controller/getUserByIDController"
import { getAllCitiesController } from "../controller/getAllCitiesController"
import { upload } from "../middleware/uploadPhotos"
import { deleteCityController } from "../controller/deleteCityController"
import { deleteAllCitiesController } from "../controller/deleteAllCitiesController"

const router = express.Router()

// Deletar Cidade
router.delete("/deleteCity/:id", deleteCityController)

// Deletar todas as cidades
router.delete("/deleteAllCities", deleteAllCitiesController)

// Registrar Aviao
router.post("/registerPlane", registerPlaneController)

// Registrar Usuario
router.post("/registerUser", registerUserController)

// Registrar Cidade
router.post("/registerCity", upload.single("imagePath"), registerCityController)

// Listar Usuarios
router.get("/users", getAllUsersController)

// Buscar Usuario por ID
router.get("/users/:id", getUserByIDContrtoller)

// Listar Avioes
router.get("/planes", getAllPlanesController)

// Listar todas as cidades

router.get("/cities", getAllCitiesController)

export default router