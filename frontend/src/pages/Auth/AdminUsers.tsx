import { FormEvent, useMemo, useState } from "react"
import * as Icons from "@mui/icons-material"
import Sidebar from "../../components/Sidebar"
import "../../styles/adminManagement.css"

type UserRole = "Administrador" | "Operador" | "Analista"

type UserStatus = "Ativo" | "Bloqueado"

type ManagedUser = {
    id: number
    name: string
    email: string
    role: UserRole
    status: UserStatus
    lastAccess: string
}

const initialUsers: ManagedUser[] = [
    {
        id: 1,
        name: "Marina Costa",
        email: "marina.costa@cryas.com",
        role: "Administrador",
        status: "Ativo",
        lastAccess: "Hoje às 09:32"
    },
    {
        id: 2,
        name: "Tiago Souza",
        email: "tiago.souza@cryas.com",
        role: "Operador",
        status: "Ativo",
        lastAccess: "Ontem às 18:10"
    },
    {
        id: 3,
        name: "Laura Díaz",
        email: "laura.diaz@cryas.com",
        role: "Analista",
        status: "Bloqueado",
        lastAccess: "12/09/2024"
    }
]

type FilterField = "name" | "email" | "role" | "status"

function AdminUsers(){
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [users, setUsers] = useState<ManagedUser[]>(initialUsers)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterField, setFilterField] = useState<FilterField>("name")
    const [editingId, setEditingId] = useState<number | null>(null)
    const [formState, setFormState] = useState<Omit<ManagedUser, "id" | "lastAccess">>({
        name: "",
        email: "",
        role: "Operador",
        status: "Ativo"
    })

    const filteredUsers = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase()
        if (!normalizedSearch) {
            return users
        }
        return users.filter((user) => {
            const value = user[filterField]
            return value.toLowerCase().includes(normalizedSearch)
        })
    }, [users, filterField, searchTerm])

    const resetForm = () => {
        setFormState({
            name: "",
            email: "",
            role: "Operador",
            status: "Ativo"
        })
        setEditingId(null)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!formState.name || !formState.email) {
            return
        }

        if (editingId) {
            setUsers((current) =>
                current.map((user) =>
                    user.id === editingId
                        ? {
                            ...user,
                            ...formState,
                            lastAccess: "Atualizado agora"
                        }
                        : user
                )
            )
        } else {
            const newUser: ManagedUser = {
                id: Math.max(0, ...users.map((user) => user.id)) + 1,
                lastAccess: "Criado agora",
                ...formState
            }
            setUsers((current) => [...current, newUser])
        }
        resetForm()
    }

    const handleEdit = (user: ManagedUser) => {
        setEditingId(user.id)
        setFormState({
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        })
    }

    const handleDelete = (userId: number) => {
        setUsers((current) => current.filter((user) => user.id !== userId))
        if (editingId === userId) {
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
                        <h1>Gerenciar usuários</h1>
                        <p className="admin-subtitle">
                            Administre permissões, roles e status dos usuários internos.
                        </p>
                    </div>
                    <button className="admin-cta" type="button" onClick={resetForm}>
                        <Icons.AddCircleOutline/>
                        Novo usuário
                    </button>
                </header>

                <section className="admin-management-toolbar">
                    <div className="admin-management-search">
                        <Icons.Search/>
                        <input
                            type="text"
                            placeholder="Buscar por usuário, email ou status"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </div>
                    <div className="admin-management-filter">
                        <label htmlFor="user-filter">Filtrar por</label>
                        <select
                            id="user-filter"
                            value={filterField}
                            onChange={(event) => setFilterField(event.target.value as FilterField)}
                        >
                            <option value="name">Nome</option>
                            <option value="email">E-mail</option>
                            <option value="role">Perfil</option>
                            <option value="status">Status</option>
                        </select>
                    </div>
                </section>

                <section className="admin-management-grid">
                    <div className="admin-management-panel">
                        <h2>Dados do usuário</h2>
                        <form className="admin-management-form" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="user-name">Nome completo</label>
                                <input
                                    id="user-name"
                                    value={formState.name}
                                    onChange={(event) => setFormState({ ...formState, name: event.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="user-email">E-mail</label>
                                <input
                                    id="user-email"
                                    type="email"
                                    value={formState.email}
                                    onChange={(event) => setFormState({ ...formState, email: event.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="user-role">Perfil</label>
                                <select
                                    id="user-role"
                                    value={formState.role}
                                    onChange={(event) => setFormState({ ...formState, role: event.target.value as UserRole })}
                                >
                                    <option value="Administrador">Administrador</option>
                                    <option value="Operador">Operador</option>
                                    <option value="Analista">Analista</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="user-status">Status</label>
                                <select
                                    id="user-status"
                                    value={formState.status}
                                    onChange={(event) =>
                                        setFormState({ ...formState, status: event.target.value as UserStatus })
                                    }
                                >
                                    <option value="Ativo">Ativo</option>
                                    <option value="Bloqueado">Bloqueado</option>
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
                        <h2>Usuários cadastrados</h2>
                        <table className="admin-management-table">
                            <thead>
                                <tr>
                                    <th>
                                        <button
                                            type="button"
                                            className={filterField === "name" ? "is-active" : ""}
                                            onClick={() => setFilterField("name")}
                                        >
                                            Nome
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            type="button"
                                            className={filterField === "email" ? "is-active" : ""}
                                            onClick={() => setFilterField("email")}
                                        >
                                            E-mail
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            type="button"
                                            className={filterField === "role" ? "is-active" : ""}
                                            onClick={() => setFilterField("role")}
                                        >
                                            Perfil
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
                                    <th>Último acesso</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <span className={`admin-pill ${user.status === "Ativo" ? "success" : "danger"}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td>{user.lastAccess}</td>
                                        <td>
                                            <div className="admin-table-actions">
                                                <button type="button" onClick={() => handleEdit(user)}>
                                                    <Icons.EditOutlined/>
                                                </button>
                                                <button type="button" onClick={() => handleDelete(user.id)}>
                                                    <Icons.DeleteOutline/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredUsers.length === 0 && (
                            <p className="admin-management-empty">Nenhum usuário encontrado com o filtro atual.</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default AdminUsers
