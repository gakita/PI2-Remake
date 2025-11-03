import { useForm } from "react-hook-form"
import { registerUserSchema } from "../schema/userValidation.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import api from "../Server"
import { useNavigate } from "react-router-dom"

function RegisterCard(){
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm({resolver:zodResolver(registerUserSchema)})
    const onSubmit = async (data:any) => {
        console.log(data)
        try{
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("email", data.email)
            formData.append("password", data.password)
            if (data.avatarPath && data.avatarPath[0]){
                formData.append("avatarPath", data.avatarPath[0])
            }
            const response = await api.post("auth/registerUser", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log(response.data)
            if (response.status === 201){
                navigate("/login")
            }else{
                alert("Erro ao registrar")
            }
        }catch(error:any){
            console.log(error.message)
            alert("Erro ao registrar")
        }
    }
    return(
        <>
        <div className="card-form">
            <div className="loginCard">
                <h1 className="brand"><span className="blue">Cry</span>as <span className="red">Air</span>ways</h1>
                <h2>Crie sua conta para continuar</h2>
                <div className="formLogin">
                    <form method="post" onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-group">
                            <label htmlFor="name">Nome: </label>
                            <input type="text" id="name" {...register("name")} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email:</label>
                            <input type="text" id="email" {...register("email")} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Senha</label>
                            <input type="password" id="password" {...register("password")} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="avatarPath">Avatar</label>
                            <input type="file" id="avatarPath" {...register("avatarPath")} />
                        </div>
                        {errors?.name && <span className="error-message">{String(errors.name?.message)}</span>}
                        {errors?.email && <span className="error-message">{String(errors.email?.message)}</span>}
                        {errors?.password && <span className="error-message">{String(errors.password?.message)}</span>}
                        {errors?.avatarPath && <span className="error-message">{String(errors.avatarPath?.message)}</span>}
                        <button type="submit">Registrar-se</button>
                    </form>
                    <p>Já tem uma conta? <a href="/login">Clique aqui</a></p>
                </div>
            </div>
        </div>
        </>
    )  
}

export default RegisterCard