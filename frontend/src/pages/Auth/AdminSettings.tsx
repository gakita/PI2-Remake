import { FormEvent, useState } from "react"
import * as Icons from "@mui/icons-material"
import Sidebar from "../../components/Sidebar"
import { useAuth } from "../../services/authContext"
import { useTheme } from "../../hooks/ThemeContext"
import "../../styles/adminSettings.css"

function AdminSettings(){
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const { user, updateUser } = useAuth()
    const { theme, setTheme } = useTheme()
    const [name, setName] = useState(user?.name ?? "")
    const [email, setEmail] = useState(user?.email ?? "")
    const [avatarPath, setAvatarPath] = useState(user?.avatarPath ?? "")
    const [language, setLanguage] = useState("Português (BR)")
    const [currency, setCurrency] = useState("BRL")
    const [notifications, setNotifications] = useState(true)
    const [autoReports, setAutoReports] = useState(false)

    const handleProfileSave = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        updateUser({ name, email, avatarPath })
    }

    return(
        <div className={`admin-layout admin-settings ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
            <Sidebar isOpen={sidebarOpen} onToggle={setSidebarOpen}/>
            <main className="admin-main">
                <header className="admin-settings-topbar">
                    <div>
                        <p className="admin-kicker">Módulo Administrativo</p>
                        <h1>Configurações</h1>
                        <p className="admin-subtitle">Personalize sua conta e ajuste preferências do painel.</p>
                    </div>
                </header>

                <section className="admin-settings-grid">
                    <div className="admin-settings-card">
                        <div className="admin-settings-card-header">
                            <Icons.PaletteOutlined/>
                            <div>
                                <h2>Tema</h2>
                                <p>Escolha como deseja visualizar o painel.</p>
                            </div>
                        </div>
                        <div className="admin-settings-theme-toggle">
                            <button
                                type="button"
                                className={theme === "dark" ? "is-active" : ""}
                                onClick={() => setTheme("dark")}
                            >
                                <Icons.DarkModeOutlined/>
                                Modo escuro
                            </button>
                            <button
                                type="button"
                                className={theme === "light" ? "is-active" : ""}
                                onClick={() => setTheme("light")}
                            >
                                <Icons.LightModeOutlined/>
                                Modo claro
                            </button>
                        </div>
                    </div>

                    <div className="admin-settings-card">
                        <div className="admin-settings-card-header">
                            <Icons.PersonOutline/>
                            <div>
                                <h2>Dados do usuário</h2>
                                <p>Atualize nome, e-mail e foto de perfil.</p>
                            </div>
                        </div>
                        <form className="admin-settings-form" onSubmit={handleProfileSave}>
                            <label htmlFor="settings-name">Nome</label>
                            <input
                                id="settings-name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                            <label htmlFor="settings-email">E-mail</label>
                            <input
                                id="settings-email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <label htmlFor="settings-avatar">Foto do usuário (URL)</label>
                            <input
                                id="settings-avatar"
                                value={avatarPath}
                                onChange={(event) => setAvatarPath(event.target.value)}
                            />
                            <div className="admin-settings-avatar-preview">
                                {avatarPath ? (
                                    <img src={avatarPath} alt="Prévia do avatar" />
                                ) : (
                                    <div className="admin-settings-avatar-placeholder">
                                        <Icons.Person/>
                                    </div>
                                )}
                                <div>
                                    <h3>Pré-visualização</h3>
                                    <p>Atualize a URL para trocar a imagem do perfil.</p>
                                </div>
                            </div>
                            <button className="admin-cta" type="submit">
                                <Icons.SaveOutlined/>
                                Salvar alterações
                            </button>
                        </form>
                    </div>

                    <div className="admin-settings-card">
                        <div className="admin-settings-card-header">
                            <Icons.SettingsOutlined/>
                            <div>
                                <h2>Configurações padrão</h2>
                                <p>Defina parâmetros para novas operações administrativas.</p>
                            </div>
                        </div>
                        <div className="admin-settings-form">
                            <label htmlFor="settings-language">Idioma padrão</label>
                            <select
                                id="settings-language"
                                value={language}
                                onChange={(event) => setLanguage(event.target.value)}
                            >
                                <option>Português (BR)</option>
                                <option>Inglês (EN)</option>
                                <option>Espanhol (ES)</option>
                            </select>
                            <label htmlFor="settings-currency">Moeda padrão</label>
                            <select
                                id="settings-currency"
                                value={currency}
                                onChange={(event) => setCurrency(event.target.value)}
                            >
                                <option value="BRL">Real (BRL)</option>
                                <option value="USD">Dólar (USD)</option>
                                <option value="EUR">Euro (EUR)</option>
                            </select>
                            <div className="admin-settings-toggle">
                                <div>
                                    <h3>Notificações de status</h3>
                                    <p>Receba alertas sobre mudanças críticas.</p>
                                </div>
                                <button
                                    type="button"
                                    className={notifications ? "is-active" : ""}
                                    onClick={() => setNotifications((current) => !current)}
                                >
                                    {notifications ? "Ativo" : "Inativo"}
                                </button>
                            </div>
                            <div className="admin-settings-toggle">
                                <div>
                                    <h3>Relatórios automáticos</h3>
                                    <p>Envio diário para o time de gestão.</p>
                                </div>
                                <button
                                    type="button"
                                    className={autoReports ? "is-active" : ""}
                                    onClick={() => setAutoReports((current) => !current)}
                                >
                                    {autoReports ? "Ativo" : "Inativo"}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default AdminSettings
