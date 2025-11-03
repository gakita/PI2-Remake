import { useEffect, useState } from "react"
import api from "../Server"
import { useForm } from "react-hook-form"
import { useAuth } from "../services/AuthContext"

export default function HeaderIndexPage(){

    const {register, handleSubmit, formState: {errors}} = useForm()
    let apiURL = import.meta.env.VITE_API_URL
    const [cities, setCity] = useState<any[]>([])
    const {user, logout} = useAuth()
    const [dropDown, setDropDown] = useState(false)

    useEffect(() => {
        api.get("/cities")
    .then(response => {
        setCity(response.data)
    })
    .catch(error => {
        console.log(error)
    })
    }, [])

    

    const onSubmit = async (data:any) => {
      const params = new URLSearchParams()
      if(data.origin) params.append('origin', data.origin)
      if(data.destiny) params.append('destiny', data.destiny)

      if(!data.origin && !data.destiny){
        alert("Preencha pelo menos um dos campos")
        return
      }
      try{
        const response = await api.get(`/trips/search?${params.toString()}`)
        console.log('resposta api:',response.data)
      }catch(error:any){
        console.log('destino:',data.destiny)
        console.log('origem:',data.origin)
        console.log(error.message)
      }
    }
    return(
        <section id="header">
        <header className="header">
          <div className="header-container">
            <div id="logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-airplane-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849"
                />
              </svg>
              <h2>Cryas Airways</h2>
            </div>
            <ul>
              <li><a href="#">Minhas Viagens</a></li>
              <li><a href="#">Ofertas</a></li>
              {user ? (
                <>
                <div className="userCard" onClick={() => setDropDown(!dropDown)}>
                  <img src={`${apiURL}/uploads/${user.avatarPath}`} alt="" />
                  <p>{user.name}</p>
                  {dropDown && (
                  <div className="userMenu">
                    <button onClick={logout}>Sair</button>
                  </div>
                )}
                </div>
                </>
              ):
              (
                <li><a href="/login">Login</a></li>
              )
            }
            </ul>
          </div>
          <div className="separator"></div>
          <main className="searchGroup">
            <div id="searchGroup" className="max-width">
              <div className="title">
                <h1>Encontre sua próxima viagem</h1>
                <h2>Busque voos para todos os lugares do mundo</h2>
              </div>
              <div className="form">
                <form method="post" onSubmit={handleSubmit(onSubmit)}>
                  <label className="input-group" htmlFor="origin">
                    <p>Origem</p>
                    <select id= "origin" {...register("origin")}>
                      <option value="" defaultValue="Cidade ou Aeroporto" >Cidade ou Aeroporto</option>
                      {Array.isArray(cities) && cities.map(city => (
                        <option key={city.id} value={city.name}>{city.name} ({city.country})</option>
                      ))}
                    </select>
                    {errors.origin && <span>{errors.origin.message?.toString()}</span>}
                  </label>
                  <label className="input-group" htmlFor="destiny">
                    <p>Destino</p>
                    <select id="destiny" {...register("destiny")} >
                      <option value="" defaultValue="Cidade ou Aeroporto">Cidade ou Aeroporto</option>
                      {Array.isArray(cities) && cities.map(city => (
                        <option key={city.id} value={city.name}>{city.name} ({city.country})</option>
                      ))}
                    </select>
                    {errors.destiny && <span>{errors.destiny.message?.toString()}</span>}
                  </label>
                  <button type="submit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                      />
                    </svg>
                    Buscar
                  </button>
                </form>
              </div>
            </div>
          </main>
        </header>
      </section>
    )
}