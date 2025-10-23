import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../api/axios.config";


export const Login = () => {
    const navigate = useNavigate();

    const { register, reset, handleSubmit } = useForm();

    const loginHandler = async (formData) => {
        await instance.post('/api/auth/login' , formData);
        reset();
        navigate('/');

    }

    return (<>
        <div className="w-full h-screen flex justify-center items-center">
            <form
                className="w-1/3 flex flex-col gap-5 p-6 rounded-xl border border-zinc-700 text-zinc-200 bg-[#171717]"
                onSubmit={handleSubmit(loginHandler)}>

                <div className=" w-full flex gap-4">
                    <div className="w-[80%]">
                        <h1 className="font-semibold ">Login to your account</h1>
                        <p className="text-md text-zinc-500">Enter your email below to login to your account</p>
                    </div>
                    <div className="w-[20%]" >
                        <Link className="font-normal" to="/register" >Sign Up</Link>
                    </div>
                </div>
                <div className="flex flex-col gap-5">

                    <label className="flex flex-col gap-1 font-semibold text-sm"> Email
                        <input
                            className="px-3 py-2 rounded-lg border border-zinc-700"
                            type="email"
                            {...register("email")} />
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
                        value="Login" />
                </div>
            </form>
        </div>
    </>)
}