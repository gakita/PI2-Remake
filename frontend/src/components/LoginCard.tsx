import { useForm } from "react-hook-form"
import { loginUserSchema } from "../schema/userValidation.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import api from "../Server"


const LoginCard = () => {

    const {register, handleSubmit, formState: {errors}} = useForm({resolver:zodResolver(loginUserSchema)})

    const onSubmit = async (data:any) => {
        try{
            const response = await api.post("auth/login",data)
            console.log(response.data.token)
            localStorage.setItem("token",response.data.token)
        }catch(error:any){
            const msg = error?.response?.data?.error || "Erro ao fazer login"
            alert(msg)
        }
    }

    return (
    <>
    <div className="loginCard">
      <h1 className="brand"><span className="blue">Cry</span>as <span className="red">Air</span>ways</h1>
      <div className="form">
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
              <label htmlFor="text">Email:</label>
              <input type="text" id="email" {...register("email")} />
            </div>
            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <input type="password" id="password" {...register("password")} />
            </div>
            {errors.email && <span>{errors.email.message}</span>}
            {errors.password && <span>{errors.password.message}</span>}
            <button type="submit">Login</button>
        </form>
      </div>
    </div>
    </>
    )
}

export default LoginCard;