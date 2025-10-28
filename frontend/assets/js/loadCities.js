document.addEventListener("DOMContentLoaded", () => {
    loadCities()
});


const api = axios.create({
    baseURL: "http://localhost:3001/api",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json"
    }
})


async function loadCities(){
    try{
        const response = await api.get("http://localhost:3001/api/cities")
        const cities = response.data
        
        const selectedOriginCity = document.getElementById("origin")
        const selectedDestinationCity = document.getElementById("destiny")

        cities.forEach(city =>{
            const option = document.createElement("option")
            option.value = city.id
            option.textContent = `${city.name}, ${city.country}`
            selectedOriginCity.appendChild(option)
            selectedDestinationCity.appendChild(option.cloneNode(true))
        })

        console.log(cities)
    }catch(error){
        console.log(error)
    }
}