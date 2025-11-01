import express from "express"
import { registerPlaneController } from "../features/registerPlane/registerPlane.controller"
import { registerUserController } from "../features/Auth/registerUser/registerUser.controller"
import { getAllUsersController } from "../features/getAllUsers/getAllUsers.controller"
import { getAllPlanesController } from "../features/getAllPlanes/getAllPlanes.controller"
import { registerCityController } from "../features/registerCity/registerCity.controller"
import { getUserByIDController} from "../features/getUserByID/getUserByID.controller"
import { getAllCitiesController } from "../features/getAllCities/getAllCities.controller"
import { upload } from "../middleware/uploadPhotos"
import { deleteCityController } from "../features/deleteCity/deleteCity.controller"
import { deleteAllCitiesController } from "../features/deleteAllCities/deleteAllCities.controller"
import { createTripController } from "../features/createTrip/createTrip.controller"
import { getAllTripsController } from "../features/getAllTrips/getAllTrips.controller"
import { getTripByIDController } from "../features/getTripByID/getTripByID.controller"
import { deleteAllUsersController } from "../features/deleteAllUsers/deleteAllUsers.controller"
import { getCitiesByNameController } from "../features/getCitiesByName/getCitiesByName.controller"
import { getUserByEmailController } from "../features/getUserByEmail/getUserByEmail.controller"
import { loginAuthController } from "../features/Auth/loginUser/loginAuth.controller"
import { getTripByNameController } from "../features/getTripByName/getTripByName.controller"

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
router.get("/users/:id", getUserByIDController)

// Buscar Usuario por Email
router.get("/users/email/:email", getUserByEmailController)

// Listar Avioes
router.get("/planes", getAllPlanesController)

// Listar todas as cidades
router.get("/cities", getAllCitiesController)

router.get("/cities/name/:name", getCitiesByNameController)

// Buscar Cidade por ID
router.get("/cities/:id", getAllTripsController)

// Listar todos os voos
router.get("/trips", getAllTripsController)

// Buscar voo por parametro
router.get("/trips/search", getTripByNameController)

// Buscar Voo por ID
router.get("/trips/:id", getTripByIDController)

// ROTA LOGIN

router.post("/auth/login",loginAuthController)

export default router