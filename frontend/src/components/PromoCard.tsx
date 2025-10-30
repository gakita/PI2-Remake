import { useState, useEffect } from "react"
import api from "../Server"
import { NormalizePath } from "../hooks/NormalizePath";


let apiURL = import.meta.env.VITE_API_URL

function PromoCard({title,price,imagePath}: any){
    const normalizedPath = NormalizePath(imagePath)
    return(
        <>
        <div className="card" >
            <div className="card-image-container">
                <img src={`${apiURL}/${normalizedPath}`} alt={title} />
            </div>
            <div className="card-infos">
                <h2 className="card-title" id="card-title">{title}</h2>
                <div className="card-price">
                <p>A partir de : <span id="card-price" className="highlight-text">{price}</span></p>
            </div>
            </div>
        </div>
        </>
    )
}

function PromoCardList(){
    const [trips, setTrips] = useState<any[]>([])
    
    useEffect(() => {
        api.get("/trips")
        .then(response => {
            setTrips(response.data)
        })
    }, [])

    return(
        <>
        <div id="grid-cards">
            {trips.map((trip) => (
                <PromoCard 
                key={trip.id}
                title={trip.toCity.name}
                price= {trip.basePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                imagePath={trip.toCity.imagePath}
                />
            ))} 
        </div>
        
        </>
    )
}
export default PromoCardList