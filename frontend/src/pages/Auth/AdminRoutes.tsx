import { FormEvent, useMemo, useState } from "react"
import * as Icons from "@mui/icons-material"
import Sidebar from "../../components/Sidebar"
import "../../styles/adminManagement.css"

type RouteStatus = "Ativa" | "Suspensa"

type Route = {
    id: number
    name: string
    origin: string
    destination: string
    distance: string
    duration: string
    status: RouteStatus
}

const initialRoutes: Route[] = [
    {
        id: 1,
        name: "Rota Atlântica",
        origin: "São Paulo",
        destination: "Lisboa",
        distance: "7.900 km",
        duration: "9h 50m",
        status: "Ativa"
    },
    {
        id: 2,
        name: "Rota Andina",
        origin: "Bogotá",
        destination: "Lima",
        distance: "1.880 km",
        duration: "3h 20m",
        status: "Suspensa"
    },
    {
        id: 3,
        name: "Rota Polar",
        origin: "Toronto",
        destination: "Reykjavík",
        distance: "3.600 km",
        duration: "5h 05m",
        status: "Ativa"
    }
]

type FilterField = "name" | "origin" | "destination" | "status"

function AdminRoutes(){
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [routes, setRoutes] = useState<Route[]>(initialRoutes)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterField, setFilterField] = useState<FilterField>("name")
    const [editingId, setEditingId] = useState<number | null>(null)
    const [formState, setFormState] = useState<Omit<Route, "id">>({
        name: "",
        origin: "",
        destination: "",
        distance: "",
        duration: "",
        status: "Ativa"
    })

    const filteredRoutes = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase()
        if (!normalizedSearch) {
            return routes
        }
        return routes.filter((route) => {
            const value = route[filterField]
            return value.toLowerCase().includes(normalizedSearch)
        })
    }, [routes, filterField, searchTerm])

    const resetForm = () => {
        setFormState({
            name: "",
            origin: "",
            destination: "",
            distance: "",
            duration: "",
            status: "Ativa"
        })
        setEditingId(null)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!formState.name || !formState.origin || !formState.destination) {
            return
        }

        if (editingId) {
            setRoutes((current) =>
                current.map((route) => (route.id === editingId ? { ...route, ...formState } : route))
            )
        } else {
            const newRoute: Route = {
                id: Math.max(0, ...routes.map((route) => route.id)) + 1,
                ...formState
            }
            setRoutes((current) => [...current, newRoute])
        }
        resetForm()
    }

    const handleEdit = (route: Route) => {
        setEditingId(route.id)
        setFormState({
            name: route.name,
            origin: route.origin,
            destination: route.destination,
            distance: route.distance,
            duration: route.duration,
            status: route.status
        })
    }

    const handleDelete = (routeId: number) => {
        setRoutes((current) => current.filter((route) => route.id !== routeId))
        if (editingId === routeId) {
            resetForm()
        }
    }

    return(
        <div className={`admin-layout admin-management ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
            <Sidebar isOpen={sidebarOpen} onToggle={setSidebarOpen}/>
            <main className="admin-main">
                <header className="admin-management-topbar">
                    <div>
                        <p className="admin-kicker">Módulo Administrativo</p>
                        <h1>Gerenciar rotas</h1>
                        <p className="admin-subtitle">
                            Cadastre, edite e acompanhe o status das rotas operacionais.
                        </p>
                    </div>
                    <button className="admin-cta" type="button" onClick={resetForm}>
                        <Icons.AddCircleOutline/>
                        Nova rota
                    </button>
                </header>

                <section className="admin-management-toolbar">
                    <div className="admin-management-search">
                        <Icons.Search/>
                        <input
                            type="text"
                            placeholder="Buscar rota, origem, destino ou status"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </div>
                    <div className="admin-management-filter">
                        <label htmlFor="route-filter">Filtrar por</label>
                        <select
                            id="route-filter"
                            value={filterField}
                            onChange={(event) => setFilterField(event.target.value as FilterField)}
                        >
                            <option value="name">Nome da rota</option>
                            <option value="origin">Origem</option>
                            <option value="destination">Destino</option>
                            <option value="status">Status</option>
                        </select>
                    </div>
                </section>

                <section className="admin-management-grid">
                    <div className="admin-management-panel">
                        <h2>Dados da rota</h2>
                        <form className="admin-management-form" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="route-name">Nome da rota</label>
                                <input
                                    id="route-name"
                                    value={formState.name}
                                    onChange={(event) => setFormState({ ...formState, name: event.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="route-origin">Origem</label>
                                <input
                                    id="route-origin"
                                    value={formState.origin}
                                    onChange={(event) => setFormState({ ...formState, origin: event.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="route-destination">Destino</label>
                                <input
                                    id="route-destination"
                                    value={formState.destination}
                                    onChange={(event) => setFormState({ ...formState, destination: event.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="route-distance">Distância</label>
                                <input
                                    id="route-distance"
                                    value={formState.distance}
                                    onChange={(event) => setFormState({ ...formState, distance: event.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="route-duration">Duração</label>
                                <input
                                    id="route-duration"
                                    value={formState.duration}
                                    onChange={(event) => setFormState({ ...formState, duration: event.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="route-status">Status</label>
                                <select
                                    id="route-status"
                                    value={formState.status}
                                    onChange={(event) =>
                                        setFormState({ ...formState, status: event.target.value as RouteStatus })
                                    }
                                >
                                    <option value="Ativa">Ativa</option>
                                    <option value="Suspensa">Suspensa</option>
                                </select>
                            </div>
                            <div className="admin-management-form-actions">
                                <button className="admin-cta" type="submit">
                                    <Icons.SaveOutlined/>
                                    {editingId ? "Atualizar" : "Adicionar"}
                                </button>
                                {editingId && (
                                    <button className="admin-cta secondary" type="button" onClick={resetForm}>
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="admin-management-panel">
                        <h2>Rotas cadastradas</h2>
                        <table className="admin-management-table">
                            <thead>
                                <tr>
                                    <th>
                                        <button
                                            type="button"
                                            className={filterField === "name" ? "is-active" : ""}
                                            onClick={() => setFilterField("name")}
                                        >
                                            Rota
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            type="button"
                                            className={filterField === "origin" ? "is-active" : ""}
                                            onClick={() => setFilterField("origin")}
                                        >
                                            Origem
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            type="button"
                                            className={filterField === "destination" ? "is-active" : ""}
                                            onClick={() => setFilterField("destination")}
                                        >
                                            Destino
                                        </button>
                                    </th>
                                    <th>Distância</th>
                                    <th>Duração</th>
                                    <th>
                                        <button
                                            type="button"
                                            className={filterField === "status" ? "is-active" : ""}
                                            onClick={() => setFilterField("status")}
                                        >
                                            Status
                                        </button>
                                    </th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRoutes.map((route) => (
                                    <tr key={route.id}>
                                        <td>{route.name}</td>
                                        <td>{route.origin}</td>
                                        <td>{route.destination}</td>
                                        <td>{route.distance}</td>
                                        <td>{route.duration}</td>
                                        <td>
                                            <span className={`admin-pill ${route.status === "Ativa" ? "success" : "warning"}`}>
                                                {route.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="admin-table-actions">
                                                <button type="button" onClick={() => handleEdit(route)}>
                                                    <Icons.EditOutlined/>
                                                </button>
                                                <button type="button" onClick={() => handleDelete(route.id)}>
                                                    <Icons.DeleteOutline/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredRoutes.length === 0 && (
                            <p className="admin-management-empty">Nenhuma rota encontrada com o filtro atual.</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default AdminRoutes
