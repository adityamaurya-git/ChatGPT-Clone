import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../api/axios.config";
import { registerUserAction } from "../store/actions/userAction";
import { useDispatch } from "react-redux";

export const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, reset, handleSubmit , formState:{errors} } = useForm();

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

        // await instance.post('/api/auth/register' ,data);
        const response = await dispatch(registerUserAction(data));
        if(response){
            reset();
            navigate('/')
        }
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center px-4 py-8 bg-transparent">
            <form
                className="w-full max-w-md sm:max-w-lg md:max-w-xl flex flex-col gap-5 p-6 rounded-xl border border-zinc-700 text-zinc-200 bg-[#171717]"
                onSubmit={handleSubmit(registerHandler)}>

                <div className=" w-full flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="flex-1">
                        <h1 className="font-semibold text-lg">Create an Account</h1>
                        <p className="text-sm text-zinc-500 mt-1">Enter your name email and password below to create an account</p>
                    </div>
                    <div className="w-full sm:w-auto text-sm text-right">
                        <Link className="font-normal text-blue-400" to="/login" >Sign In</Link>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <label className="flex flex-col gap-1 font-semibold text-sm"> Email
                        <input
                            className="px-3 py-2 rounded-lg border border-zinc-700 bg-transparent"
                            type="email"
                            {...register("email" , {required:"Email is required"})}/>
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </label>

                    <label className="flex flex-col gap-1 font-semibold text-sm"> Firstname
                        <input
                            className="px-3 py-2 rounded-lg border border-zinc-700 bg-transparent"
                            type="text"
                            {...register("firstName",{required:"Firstname is required"})} />
                            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                    </label>

                    <label className="flex flex-col gap-1 font-semibold text-sm"> Lastname
                        <input
                            className="px-3 py-2 rounded-lg border border-zinc-700 bg-transparent"
                            type="text"
                            {...register("lastName" , {required:"Lastname is required"})} />
                            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                    </label>

                    <label className="flex flex-col gap-1 font-semibold text-sm"> Password
                        <input
                            className="px-3 py-2 rounded-lg border border-zinc-700 bg-transparent"
                            type="password"
                            {...register("password" ,{required:"Password is required"})} />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </label>

                    <input
                        className="w-full sm:w-auto px-3 py-2 rounded-lg bg-zinc-100 font-mono text-black"
                        type="submit"
                        value="Create" />
                </div>
            </form>
        </div>
    )
}