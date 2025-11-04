import { useForm } from "react-hook-form"
import { loginUserSchema } from "../schema/userValidation.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import api from "../Server"
import { z } from "zod"
import "../styles/loginIndex.css"
import { useAuth } from "../services/authContext"
import { useState } from "react"
import { ClipLoader} from "react-spinners"

const LoginCard = () => {

    const {user, login} = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm<z.infer<typeof loginUserSchema>>({resolver:zodResolver(loginUserSchema)})

    const onSubmit = async (data: z.infer<typeof loginUserSchema>) => {
        try{
            setLoading(true)
            const response = await api.post("auth/login",data)
            console.log(response.data.token)
            localStorage.setItem("token",response.data.token)
            login(response.data.user, response.data.token)
            navigate("/")
        }catch(error:any){
            const msg = error?.response?.data?.error || "Erro ao fazer login"
            alert(msg)
        }finally{
            setLoading(false)
        }
        
    }

    return (
    <>
    <div className="card-form">
      <div className="loginCard">
      <h1 className="brand"><span className="blue">Cry</span>as <span className="red">Air</span>ways</h1>
      <h2>Faça seu login para continuar</h2>
      <div className="formLogin">
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
              <label htmlFor="text">Email:</label>
              <input type="text" id="email" {...register("email")} />
            </div>
            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <input type="password" id="password" {...register("password")} />
            </div>
            {errors.email && <span>{errors.email?.message}</span>}
            {errors.password && <span>{errors.password?.message}</span>}
            {loading ? <ClipLoader color="#1890fb" size={25} speedMultiplier={0.5} aria-label="loading..."/> : <button type="submit" disabled={loading}>Login</button>}
        </form>
        <p>Não tem uma conta? <a href="/register">Clique aqui</a></p>
      </div>
    </div>
    </div>
    </>
    )
}

export default LoginCard;