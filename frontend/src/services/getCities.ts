import axios from "axios";
import "dotenv/config"
import api from "../server"

export const getAllCitiesService = async () =>{
    return api.get("/cities")
}