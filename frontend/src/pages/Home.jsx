import { Navbar } from "../Components/Navbar"

export const Home = () => {

    return (<>

        <main className="w-screen h-screen"> 
           <Navbar/>
           <div className="w-full h-full flex flex-col items-center justify-center">
            <h1 className=" text-3xl font-bold text-center">Welcome to ChatGPT Clone</h1>
            <p className="text-center mt-4 text-lg">Your personal AI assistant powered by Gemini.</p>
           </div>
        </main>
    </>)
}