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
        <div className="w-full min-h-screen flex items-center justify-center px-4 py-8 bg-transparent">
            <form
                className="w-full max-w-md sm:max-w-lg md:max-w-xl flex flex-col gap-5 p-6 rounded-xl border border-zinc-700 text-zinc-200 bg-[#171717]"
                onSubmit={handleSubmit(loginHandler)}>

                <div className=" w-full flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="flex-1">
                        <h1 className="font-semibold text-lg">Login to your account</h1>
                        <p className="text-sm text-zinc-500 mt-1">Enter your email below to login to your account</p>
                    </div>
                    <div className="w-full sm:w-auto text-sm text-right">
                        <Link className="font-normal text-blue-400" to="/register" >Sign Up</Link>
                    </div>
                </div>

                <div className="flex flex-col gap-4">

                    <label className="flex flex-col gap-1 font-semibold text-sm"> Email
                        <input
                            className="px-3 py-2 rounded-lg border border-zinc-700 bg-transparent"
                            type="email"
                            {...register("email")} />
                    </label>

                    <label className="flex flex-col gap-1 font-semibold text-sm"> Password
                        <input
                            className="px-3 py-2 rounded-lg border border-zinc-700 bg-transparent"
                            type="password"
                            {...register("password")} />
                    </label>

                    <input
                        className="w-full sm:w-auto px-3 py-2 rounded-lg bg-zinc-100 font-mono text-black"
                        type="submit"
                        value="Login" />
                </div>
            </form>
        </div>
    </>)
}