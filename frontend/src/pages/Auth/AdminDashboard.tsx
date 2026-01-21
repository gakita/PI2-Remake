import { useState } from "react"
import * as Icons from "@mui/icons-material"
import Sidebar from "../../components/Sidebar"

function AdminDashboard(){
    const [sidebarOpen, setSidebarOpen] = useState(true)

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
                            <h2>128</h2>
                        </div>
                        <Icons.FlightTakeoff/>
                    </article>
                    <article className="admin-card">
                        <div>
                            <p>Rotas cadastradas</p>
                            <h2>54</h2>
                        </div>
                        <Icons.RouteOutlined/>
                    </article>
                    <article className="admin-card">
                        <div>
                            <p>Aeronaves em operação</p>
                            <h2>32</h2>
                        </div>
                        <Icons.AirplanemodeActive/>
                    </article>
                    <article className="admin-card">
                        <div>
                            <p>Usuários ativos</p>
                            <h2>1.245</h2>
                        </div>
                        <Icons.PeopleAltOutlined/>
                    </article>
                </section>

                <section className="admin-columns">
                    <div className="admin-panel">
                        <h3>Fluxo do dia</h3>
                        <ul>
                            <li>
                                <span>07:30</span>
                                <div>
                                    <strong>Revisar check-ins antecipados</strong>
                                    <p>18 passageiros aguardando confirmação.</p>
                                </div>
                            </li>
                            <li>
                                <span>10:15</span>
                                <div>
                                    <strong>Validar rota internacional</strong>
                                    <p>Atualize slot do voo CRY-209.</p>
                                </div>
                            </li>
                            <li>
                                <span>15:40</span>
                                <div>
                                    <strong>Auditar aeronaves</strong>
                                    <p>4 aeronaves aguardam revisão.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="admin-panel">
                        <h3>Atalhos rápidos</h3>
                        <div className="admin-shortcuts">
                            <button>
                                <Icons.ConnectingAirports/>
                                Gerenciar voos
                            </button>
                            <button>
                                <Icons.Apartment/>
                                Cidades e hubs
                            </button>
                            <button>
                                <Icons.PersonOutline/>
                                Usuários e permissões
                            </button>
                            <button>
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
