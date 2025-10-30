import { createCard } from "./createCard.js"

const api = axios.create({
    baseURL: "http://localhost:3001/api",
    timeout: 1000,
    Headers: {
        "Content-Type": "application/json"
    }
})

const gridCards = document.getElementById("grid-cards")

document.addEventListener("DOMContentLoaded", () =>{
    loadTrips()
})


async function loadTrips(){
    try{
        
        const response = await axios.get("http://localhost:3001/api/cities")
        const trips = response.data
        trips.forEach(cities => {
            let generatedRandomPrice = (Math.floor(Math.random() * 10000))
            let card = createCard(cities.name, generatedRandomPrice, cities.imagePath)
            gridCards.appendChild(card.cloneNode(true))
        })
        console.log(trips)
    }catch(error){
        console.log(error)
    }
}
