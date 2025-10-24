import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../Components/Navbar"
import { useEffect } from "react";
import { currentUserAction } from "../store/actions/userAction";

export const Home = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => {
        return state.user
    });

    useEffect(() => {
        dispatch(currentUserAction());
    }, []);

    // console.log(user?.fullName.firstName);
    return (<>

        <main className="w-screen min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
            <Navbar />
            <div className="flex-1 w-full flex flex-col items-center justify-center px-4 py-6">
                <h1 className=" text-2xl sm:text-3xl font-bold text-center">{user?.fullName? `Welcome , ${user.fullName.firstName}`:`Welcome to ChatGPT Clone`}</h1>
                <p className="text-center mt-3 sm:mt-4 text-base sm:text-lg text-zinc-300 max-w-xl">Your personal AI assistant powered by Gemini.</p>
            </div>
        </main>
    </>)
}