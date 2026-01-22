import { useEffect, useMemo, useState } from "react"
import * as Icons from "@mui/icons-material"
import Sidebar from "../../components/Sidebar"
import api from "../../Server"
import { useNavigate } from "react-router-dom"

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

type MetricState = {
    trips: number
    routes: number
    planes: number
    users: number
}

const formatTime = (value: string) => {
    const parsed = new Date(value)
    if (!Number.isNaN(parsed.getTime())) {
        return parsed.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    }
    const match = value.match(/^(\d{2}:\d{2})/)
    return match ? match[1] : value
}

const sortTimeValue = (value: string) => {
    if (!value) return Number.POSITIVE_INFINITY
    const isoMatch = value.match(/^(\d{2}:\d{2})(:\d{2})?$/)
    if (isoMatch) {
        const time = new Date(`1970-01-01T${value}`)
        return time.getTime()
    }
    const parsed = new Date(value)
    if (!Number.isNaN(parsed.getTime())) {
        return parsed.getTime()
    }
    return Number.POSITIVE_INFINITY
}

function AdminDashboard(){
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const navigate = useNavigate()
    const [metrics, setMetrics] = useState<MetricState>({
        trips: 0,
        routes: 0,
        planes: 0,
        users: 0
    })
    const [trips, setTrips] = useState<Trip[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchMetrics = async () => {
            setLoading(true)
            setError(null)
            try {
                const [tripsResponse, planesResponse, usersResponse] = await Promise.all([
                    api.get("/trips"),
                    api.get("/planes"),
                    api.get("/users")
                ])

                const tripData: Trip[] = Array.isArray(tripsResponse.data) ? tripsResponse.data : []
                const planes = Array.isArray(planesResponse.data) ? planesResponse.data : []
                const users = Array.isArray(usersResponse.data) ? usersResponse.data : []

                const routeSet = new Set(
                    tripData.map((trip) => `${trip.fromCity?.id ?? "?"}-${trip.toCity?.id ?? "?"}`)
                )

                setTrips(tripData)
                setMetrics({
                    trips: tripData.length,
                    routes: routeSet.size,
                    planes: planes.length,
                    users: users.length
                })
            } catch (err) {
                console.error(err)
                setError("Não foi possível carregar os indicadores agora.")
            } finally {
                setLoading(false)
            }
        }

        fetchMetrics()
    }, [])

    const dayFlow = useMemo(() => {
        const formatter = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return [...trips]
            .sort((a, b) => sortTimeValue(a.departureDate) - sortTimeValue(b.departureDate))
            .slice(0, 3)
            .map((trip) => ({
                time: formatTime(trip.departureDate),
                title: `Voo CRY-${trip.id.toString().padStart(3, "0")}`,
                detail: `${trip.fromCity?.name ?? "Origem"} → ${trip.toCity?.name ?? "Destino"} • ${formatter.format(
                    trip.basePrice ?? 0
                )}`
            }))
    }, [trips])

    return(
        <div className={`admin-layout ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
            <Sidebar isOpen={sidebarOpen} onToggle={setSidebarOpen}/>
            <main className="admin-main">
                <header className="admin-topbar">
                    <div>
                        <p className="admin-kicker">Módulo Administrativo</p>
                        <h1>Visão geral</h1>
                        <p className="admin-subtitle">Acompanhe o status operacional e acesse as áreas principais.</p>
                    </div>
                    <div className="admin-actions">
                        <button className="admin-cta secondary">
                            <Icons.AssignmentOutlined/>
                            Relatórios
                        </button>
                        <button className="admin-cta">
                            <Icons.AddCircleOutline/>
                            Novo voo
                        </button>
                    </div>
                </header>

                <section className="admin-metrics">
                    <article className="admin-card">
                        <div>
                            <p>Voos ativos</p>
                            <h2>{loading ? "--" : metrics.trips}</h2>
                        </div>
                        <Icons.FlightTakeoff/>
                    </article>
                    <article className="admin-card">
                        <div>
                            <p>Rotas cadastradas</p>
                            <h2>{loading ? "--" : metrics.routes}</h2>
                        </div>
                        <Icons.RouteOutlined/>
                    </article>
                    <article className="admin-card">
                        <div>
                            <p>Aeronaves em operação</p>
                            <h2>{loading ? "--" : metrics.planes}</h2>
                        </div>
                        <Icons.AirplanemodeActive/>
                    </article>
                    <article className="admin-card">
                        <div>
                            <p>Usuários ativos</p>
                            <h2>{loading ? "--" : metrics.users}</h2>
                        </div>
                        <Icons.PeopleAltOutlined/>
                    </article>
                </section>

                <section className="admin-columns">
                    <div className="admin-panel">
                        <h3>Fluxo do dia</h3>
                        {loading ? (
                            <p className="admin-panel-empty">Carregando fluxo de viagens...</p>
                        ) : error ? (
                            <p className="admin-panel-empty">{error}</p>
                        ) : (
                            <ul>
                                {dayFlow.map((flow) => (
                                    <li key={`${flow.time}-${flow.title}`}>
                                        <span>{flow.time}</span>
                                        <div>
                                            <strong>{flow.title}</strong>
                                            <p>{flow.detail}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {!error && !loading && dayFlow.length === 0 && (
                            <p className="admin-panel-empty">Nenhuma saída registrada para hoje.</p>
                        )}
                    </div>
                    <div className="admin-panel">
                        <h3>Atalhos rápidos</h3>
                        <div className="admin-shortcuts">
                            <button type="button" onClick={() => navigate("/admin/voos")}>
                                <Icons.ConnectingAirports/>
                                Gerenciar voos
                            </button>
                            <button type="button" onClick={() => navigate("/admin/cidades")}>
                                <Icons.Apartment/>
                                Cidades e hubs
                            </button>
                            <button type="button" onClick={() => navigate("/admin/usuarios")}>
                                <Icons.PersonOutline/>
                                Usuários e permissões
                            </button>
                            <button type="button" onClick={() => navigate("/admin/configuracoes")}>
                                <Icons.SettingsOutlined/>
                                Configurações
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default AdminDashboard
