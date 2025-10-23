import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../api/axios.config";


export const Register = () => {
    const navigate = useNavigate();

    const { register, reset, handleSubmit } = useForm();

    const registerHandler = async (formData) => {
        const {email ,firstName , lastName , password} = formData;

        const data = {
            email,
            fullName:{
                firstName,
                lastName
            },
            password
        }

        await instance.post('/api/auth/register' ,data);
        reset();
        navigate('/')
    }

    return (<>
        <div className="w-full h-screen flex justify-center items-center">
            <form
                className="w-1/3 flex flex-col gap-5 p-6 rounded-xl border border-zinc-700 text-zinc-200 bg-[#171717]"
                onSubmit={handleSubmit(registerHandler)}>

                <div className=" w-full flex gap-4">
                    <div className="w-[80%]">
                        <h1 className="font-semibold ">Create an Account</h1>
                        <p className="text-md text-zinc-500">Enter your name email and password below to create an account</p>
                    </div>
                    <div className="w-[20%]" >
                        <Link className="font-normal" to="/login" >Sign In</Link>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <label className="flex flex-col gap-1 font-semibold text-sm"> Email
                        <input
                            className="px-3 py-2 rounded-lg border border-zinc-700"
                            type="email"
                            {...register("email")}
                        />
                    </label>

                    <label className="flex flex-col gap-1 font-semibold text-sm"> Firstname
                        <input
                            className="px-3 py-2 rounded-lg border border-zinc-700"
                            type="text"
                            {...register("firstName")} />
                    </label>

                    <label className="flex flex-col gap-1 font-semibold text-sm"> Lastname
                        <input
                            className="px-3 py-2 rounded-lg border border-zinc-700"
                            type="text"
                            {...register("lastName")} />
                    </label>

                    <label className="flex flex-col gap-1 font-semibold text-sm"> Password
                        <input
                            className="px-3 py-2 rounded-lg border border-zinc-700"
                            type="password"
                            {...register("password")} />
                    </label>

                    <input
                        className="px-3 py-2 rounded-lg bg-zinc-100 font-mono text-black"
                        type="submit"
                        value="Create" />
                </div>
            </form>
        </div>
    </>)
}