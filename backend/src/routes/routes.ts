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
import { createTripController } from "../controller/createTripController"
import { getAllTripsController } from "../controller/getAllTripsController"
import { getTripByIDController } from "../controller/getTripByIDController"
import { deleteAllUsersController } from "../controller/deleteAllUsersController"

const router = express.Router()


// ROTAS DELETE

// Deletar Cidade
router.delete("/deleteCity/:id", deleteCityController)

// Deletar todas as cidades
router.delete("/deleteAllCities", deleteAllCitiesController)

// Deletar todos os usuarios
router.delete("/deleteAllUsers", deleteAllUsersController)

// ROTAS POST

// Registrar Aviao
router.post("/registerPlane", registerPlaneController)

// Registrar Usuario
router.post("/registerUser", upload.single("avatarPath"),registerUserController)

// Registrar Cidade
router.post("/registerCity", upload.single("imagePath"), registerCityController)

// Registrar Viagem
router.post("/registerTrip", createTripController)

// ROTAS GET

// Listar Usuarios
router.get("/users", getAllUsersController)

// Buscar Usuario por ID
router.get("/users/:id", getUserByIDContrtoller)

// Listar Avioes
router.get("/planes", getAllPlanesController)

// Listar todas as cidades
router.get("/cities", getAllCitiesController)

// Buscar Cidade por ID
router.get("/cities/:id", getAllTripsController)

// Listar todos os voos
router.get("/trips", getAllTripsController)

// Buscar Voo por ID
router.get("/trips/:id", getTripByIDController)

export default router