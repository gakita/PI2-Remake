import { useMemo, useState } from "react"
import * as Icons from "@mui/icons-material"
import Sidebar from "../../components/Sidebar"
import "../../styles/adminFlights.css"

type FlightType = "Nacional" | "Internacional"

type Flight = {
    id: string
    code: string
    origin: string
    destination: string
    aircraft: string
    departure: string
    status: string
    type: FlightType
}

const flights: Flight[] = [
    {
        id: "1",
        code: "CRY-102",
        origin: "São Paulo (GRU)",
        destination: "Rio de Janeiro (GIG)",
        aircraft: "Airbus A320",
        departure: "07:45",
        status: "Embarque",
        type: "Nacional"
    },
    {
        id: "2",
        code: "CRY-205",
        origin: "Brasília (BSB)",
        destination: "Salvador (SSA)",
        aircraft: "Boeing 737",
        departure: "09:20",
        status: "Pontual",
        type: "Nacional"
    },
    {
        id: "3",
        code: "CRY-309",
        origin: "Recife (REC)",
        destination: "Fortaleza (FOR)",
        aircraft: "Embraer 195",
        departure: "10:10",
        status: "Aguardando",
        type: "Nacional"
    },
    {
        id: "4",
        code: "CRY-412",
        origin: "São Paulo (GRU)",
        destination: "Lisboa (LIS)",
        aircraft: "Boeing 787",
        departure: "12:30",
        status: "Confirmado",
        type: "Internacional"
    },
    {
        id: "5",
        code: "CRY-518",
        origin: "Rio de Janeiro (GIG)",
        destination: "Miami (MIA)",
        aircraft: "Airbus A330",
        departure: "14:50",
        status: "Embarque",
        type: "Internacional"
    },
    {
        id: "6",
        code: "CRY-621",
        origin: "Curitiba (CWB)",
        destination: "Buenos Aires (EZE)",
        aircraft: "Airbus A321",
        departure: "16:15",
        status: "Pontual",
        type: "Internacional"
    }
]

const tabOptions: { label: string; type: FlightType }[] = [
    { label: "Nacionais", type: "Nacional" },
    { label: "Internacionais", type: "Internacional" }
]

function AdminFlights(){
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [activeType, setActiveType] = useState<FlightType>("Nacional")
    const [searchTerm, setSearchTerm] = useState("")

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
                flight.aircraft,
                flight.status
            ]
                .join(" ")
                .toLowerCase()

            return matchesType && searchable.includes(normalizedSearch)
        })
    }, [activeType, searchTerm])

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
                            placeholder="Buscar por voo, origem, destino ou aeronave"
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
                                <th>Aeronave</th>
                                <th>Partida</th>
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
                                    <td>{flight.aircraft}</td>
                                    <td>{flight.departure}</td>
                                    <td>
                                        <span className={`admin-flight-status ${flight.status.toLowerCase()}`}>
                                            {flight.status}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="admin-flight-tag">{flight.type}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredFlights.length === 0 && (
                        <div className="admin-flights-empty">
                            <Icons.EventBusyOutlined/>
                            <p>Nenhum voo encontrado com os filtros atuais.</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}

export default AdminFlights
