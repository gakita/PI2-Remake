import { useEffect, useMemo, useState } from "react"
import * as Icons from "@mui/icons-material"
import Sidebar from "../../components/Sidebar"
import api from "../../Server"
import "../../styles/adminFlights.css"

type FlightType = "Nacional" | "Internacional"

type City = {
    id: number
    name: string
    country: string
}

type Trip = {
    id: number
    fromCity: City
    toCity: City
    departureDate: string
    basePrice: number
    availableSeats: number
}

type FlightStatus = {
    label: string
    className: "disponivel" | "ultimas-vagas" | "lotado"
}

type Flight = {
    id: number
    code: string
    origin: string
    destination: string
    departure: string
    price: string
    seats: number
    status: FlightStatus
    type: FlightType
}

const formatTime = (value: string) => {
    const parsed = new Date(value)
    if (!Number.isNaN(parsed.getTime())) {
        return parsed.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    }
    const match = value.match(/^(\d{2}:\d{2})/)
    return match ? match[1] : value
}

const tabOptions: { label: string; type: FlightType }[] = [
    { label: "Nacionais", type: "Nacional" },
    { label: "Internacionais", type: "Internacional" }
]

function AdminFlights(){
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [activeType, setActiveType] = useState<FlightType>("Nacional")
    const [searchTerm, setSearchTerm] = useState("")
    const [trips, setTrips] = useState<Trip[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTrips = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await api.get("/trips")
                setTrips(Array.isArray(response.data) ? response.data : [])
            } catch (err) {
                console.error(err)
                setError("Não foi possível carregar os voos agora.")
            } finally {
                setLoading(false)
            }
        }

        fetchTrips()
    }, [])

    const flights = useMemo<Flight[]>(() => {
        const formatter = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return trips.map((trip) => {
            const isNational = trip.fromCity?.country === trip.toCity?.country
            const type: FlightType = isNational ? "Nacional" : "Internacional"
            const status: FlightStatus =
                trip.availableSeats <= 0
                    ? { label: "Lotado", className: "lotado" }
                    : trip.availableSeats < 10
                        ? { label: "Últimas vagas", className: "ultimas-vagas" }
                        : { label: "Disponível", className: "disponivel" }

            return {
                id: trip.id,
                code: `CRY-${trip.id.toString().padStart(3, "0")}`,
                origin: `${trip.fromCity?.name ?? "Origem"} (${trip.fromCity?.country ?? "-"})`,
                destination: `${trip.toCity?.name ?? "Destino"} (${trip.toCity?.country ?? "-"})`,
                departure: formatTime(trip.departureDate),
                price: formatter.format(trip.basePrice ?? 0),
                seats: trip.availableSeats ?? 0,
                status,
                type
            }
        })
    }, [trips])

    const filteredFlights = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase()

        return flights.filter((flight) => {
            const matchesType = flight.type === activeType

            if (!normalizedSearch) {
                return matchesType
            }

            const searchable = [
                flight.code,
                flight.origin,
                flight.destination,
                flight.price,
                flight.status.label,
                flight.type
            ]
                .join(" ")
                .toLowerCase()

            return matchesType && searchable.includes(normalizedSearch)
        })
    }, [activeType, searchTerm, flights])

    const handleTypeToggle = () => {
        setActiveType((current) => (current === "Nacional" ? "Internacional" : "Nacional"))
    }

    return(
        <div className={`admin-layout admin-flights ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
            <Sidebar isOpen={sidebarOpen} onToggle={setSidebarOpen}/>
            <main className="admin-main">
                <header className="admin-flights-topbar">
                    <div>
                        <p className="admin-kicker">Módulo Administrativo</p>
                        <h1>Gerenciar voos</h1>
                        <p className="admin-flights-subtitle">
                            Visualize todos os voos existentes e acompanhe detalhes operacionais.
                        </p>
                    </div>
                    <button className="admin-cta">
                        <Icons.AddCircleOutline/>
                        Novo voo
                    </button>
                </header>

                <section className="admin-flights-toolbar">
                    <div className="admin-flights-tabs" role="tablist" aria-label="Tipos de voos">
                        {tabOptions.map((tab) => (
                            <button
                                key={tab.type}
                                role="tab"
                                aria-selected={activeType === tab.type}
                                className={`admin-flights-tab ${activeType === tab.type ? "active" : ""}`}
                                onClick={() => setActiveType(tab.type)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="admin-flights-search">
                        <Icons.Search/>
                        <input
                            type="text"
                            placeholder="Buscar por voo, origem, destino ou tarifa"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </div>
                </section>

                <section className="admin-flights-table-wrapper">
                    <table className="admin-flights-table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Origem</th>
                                <th>Destino</th>
                                <th>Partida</th>
                                <th>Tarifa</th>
                                <th>Assentos</th>
                                <th>Status</th>
                                <th>
                                    <button
                                        type="button"
                                        className="admin-flights-type-toggle"
                                        onClick={handleTypeToggle}
                                    >
                                        Tipo ({activeType})
                                        <Icons.SyncAlt/>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFlights.map((flight) => (
                                <tr key={flight.id}>
                                    <td>{flight.code}</td>
                                    <td>{flight.origin}</td>
                                    <td>{flight.destination}</td>
                                    <td>{flight.departure}</td>
                                    <td>{flight.price}</td>
                                    <td>{flight.seats}</td>
                                    <td>
                                        <span className={`admin-flight-status ${flight.status.className}`}>
                                            {flight.status.label}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="admin-flight-tag">{flight.type}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {error && <p className="admin-flights-empty-text">{error}</p>}
                    {!loading && !error && filteredFlights.length === 0 && (
                        <div className="admin-flights-empty">
                            <Icons.EventBusyOutlined/>
                            <p>Nenhum voo encontrado com os filtros atuais.</p>
                        </div>
                    )}
                    {loading && (
                        <div className="admin-flights-empty">
                            <Icons.FlightTakeoff/>
                            <p>Carregando voos...</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}

export default AdminFlights
