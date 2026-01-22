import { FormEvent, useMemo, useState } from "react"
import * as Icons from "@mui/icons-material"
import Sidebar from "../../components/Sidebar"
import "../../styles/adminManagement.css"

type CityStatus = "Ativa" | "Em manutenção"

type City = {
    id: number
    name: string
    country: string
    state: string
    hub: string
    status: CityStatus
    updatedAt: string
}

const initialCities: City[] = [
    {
        id: 1,
        name: "São Paulo",
        country: "Brasil",
        state: "SP",
        hub: "GRU",
        status: "Ativa",
        updatedAt: "12/09/2024"
    },
    {
        id: 2,
        name: "Lisboa",
        country: "Portugal",
        state: "LX",
        hub: "LIS",
        status: "Ativa",
        updatedAt: "04/09/2024"
    },
    {
        id: 3,
        name: "Bogotá",
        country: "Colômbia",
        state: "DC",
        hub: "BOG",
        status: "Em manutenção",
        updatedAt: "30/08/2024"
    }
]

type FilterField = "name" | "country" | "hub" | "status"

function AdminCities(){
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [cities, setCities] = useState<City[]>(initialCities)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterField, setFilterField] = useState<FilterField>("name")
    const [editingId, setEditingId] = useState<number | null>(null)
    const [formState, setFormState] = useState<Omit<City, "id" | "updatedAt">>({
        name: "",
        country: "",
        state: "",
        hub: "",
        status: "Ativa"
    })

    const filteredCities = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase()
        if (!normalizedSearch) {
            return cities
        }
        return cities.filter((city) => {
            const value = city[filterField]
            return value.toLowerCase().includes(normalizedSearch)
        })
    }, [cities, filterField, searchTerm])

    const resetForm = () => {
        setFormState({
            name: "",
            country: "",
            state: "",
            hub: "",
            status: "Ativa"
        })
        setEditingId(null)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!formState.name || !formState.country || !formState.hub) {
            return
        }

        if (editingId) {
            setCities((current) =>
                current.map((city) =>
                    city.id === editingId
                        ? {
                            ...city,
                            ...formState,
                            updatedAt: new Date().toLocaleDateString("pt-BR")
                        }
                        : city
                )
            )
        } else {
            const newCity: City = {
                id: Math.max(0, ...cities.map((city) => city.id)) + 1,
                updatedAt: new Date().toLocaleDateString("pt-BR"),
                ...formState
            }
            setCities((current) => [...current, newCity])
        }
        resetForm()
    }

    const handleEdit = (city: City) => {
        setEditingId(city.id)
        setFormState({
            name: city.name,
            country: city.country,
            state: city.state,
            hub: city.hub,
            status: city.status
        })
    }

    const handleDelete = (cityId: number) => {
        setCities((current) => current.filter((city) => city.id !== cityId))
        if (editingId === cityId) {
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
                        <h1>Gerenciar cidades</h1>
                        <p className="admin-subtitle">
                            Controle as cidades atendidas, hubs estratégicos e status de operação.
                        </p>
                    </div>
                    <button className="admin-cta" type="button" onClick={resetForm}>
                        <Icons.AddCircleOutline/>
                        Nova cidade
                    </button>
                </header>

                <section className="admin-management-toolbar">
                    <div className="admin-management-search">
                        <Icons.Search/>
                        <input
                            type="text"
                            placeholder="Buscar cidade, hub ou status"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </div>
                    <div className="admin-management-filter">
                        <label htmlFor="city-filter">Filtrar por</label>
                        <select
                            id="city-filter"
                            value={filterField}
                            onChange={(event) => setFilterField(event.target.value as FilterField)}
                        >
                            <option value="name">Nome</option>
                            <option value="country">País</option>
                            <option value="hub">Hub</option>
                            <option value="status">Status</option>
                        </select>
                    </div>
                </section>

                <section className="admin-management-grid">
                    <div className="admin-management-panel">
                        <h2>Informações da cidade</h2>
                        <form className="admin-management-form" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="city-name">Nome</label>
                                <input
                                    id="city-name"
                                    value={formState.name}
                                    onChange={(event) => setFormState({ ...formState, name: event.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="city-country">País</label>
                                <input
                                    id="city-country"
                                    value={formState.country}
                                    onChange={(event) => setFormState({ ...formState, country: event.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="city-state">UF/Região</label>
                                <input
                                    id="city-state"
                                    value={formState.state}
                                    onChange={(event) => setFormState({ ...formState, state: event.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="city-hub">Hub principal</label>
                                <input
                                    id="city-hub"
                                    value={formState.hub}
                                    onChange={(event) => setFormState({ ...formState, hub: event.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="city-status">Status</label>
                                <select
                                    id="city-status"
                                    value={formState.status}
                                    onChange={(event) =>
                                        setFormState({ ...formState, status: event.target.value as CityStatus })
                                    }
                                >
                                    <option value="Ativa">Ativa</option>
                                    <option value="Em manutenção">Em manutenção</option>
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
                        <h2>Lista de cidades</h2>
                        <table className="admin-management-table">
                            <thead>
                                <tr>
                                    <th>
                                        <button
                                            type="button"
                                            className={filterField === "name" ? "is-active" : ""}
                                            onClick={() => setFilterField("name")}
                                        >
                                            Cidade
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            type="button"
                                            className={filterField === "country" ? "is-active" : ""}
                                            onClick={() => setFilterField("country")}
                                        >
                                            País
                                        </button>
                                    </th>
                                    <th>UF</th>
                                    <th>
                                        <button
                                            type="button"
                                            className={filterField === "hub" ? "is-active" : ""}
                                            onClick={() => setFilterField("hub")}
                                        >
                                            Hub
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            type="button"
                                            className={filterField === "status" ? "is-active" : ""}
                                            onClick={() => setFilterField("status")}
                                        >
                                            Status
                                        </button>
                                    </th>
                                    <th>Atualizado</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCities.map((city) => (
                                    <tr key={city.id}>
                                        <td>{city.name}</td>
                                        <td>{city.country}</td>
                                        <td>{city.state}</td>
                                        <td>{city.hub}</td>
                                        <td>
                                            <span className={`admin-pill ${city.status === "Ativa" ? "success" : "warning"}`}>
                                                {city.status}
                                            </span>
                                        </td>
                                        <td>{city.updatedAt}</td>
                                        <td>
                                            <div className="admin-table-actions">
                                                <button type="button" onClick={() => handleEdit(city)}>
                                                    <Icons.EditOutlined/>
                                                </button>
                                                <button type="button" onClick={() => handleDelete(city.id)}>
                                                    <Icons.DeleteOutline/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredCities.length === 0 && (
                            <p className="admin-management-empty">Nenhuma cidade encontrada com o filtro atual.</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default AdminCities
