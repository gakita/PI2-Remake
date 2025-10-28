let randomPrice = Math.floor(Math.random() * 1000)

document.addEventListener("DOMContentLoaded", () => {
    loadTrip()
})

export async function loadTrip() {
    try{
        const response = await axios.get("http://localhost:3001/api/cities")
        const cities = response.data

        const cardTitle = document.getElementById("card-title")
        const cardPrice = document.getElementById("card-price")
        const card = document.getElementById("card")
        randomPrice.toFixed(2)

        for (let i = 0; i < 3; i++) {
            
            let randomCity = cities[Math.floor(Math.random() * cities.length)]
            cardTitle.innerText = randomCity.name
            cardPrice.innerText = `${randomPrice}`
        }
        cardPrice.classList.add("card-price")
    }catch(error){
        console.log(error)
    }
}