import { NavLink } from "react-router-dom"

export const Navbar = () =>{

    return(<>
        <nav className="w-full h-20 p-2 flex justify-center items-center ">
            <div className="w-3/4 h-full flex overflow-hidden rounded-4xl bg-[#1D1D1D]">
                <div className="w-1/5 h-full flex justify-center items-center ">
                    <h1 className="text-white font-bold text-2xl px-4 py-3 font-mono">ChatGPT</h1>
                </div>
                <div className="w-4/5 h-full flex justify-between  ">
                    <div className="w-full h-full flex justify-center items-center gap-2 font-mono ">
                        <NavLink className={(e) => ` px-2 py-1 rounded-4xl font-semibold ${ e.isActive ? "bg-zinc-100 text-black" : "bg-none"}`} to="/">Home</NavLink>
                        <NavLink className={(e) => ` px-2 py-1 rounded-4xl font-semibold ${ e.isActive ? "bg-zinc-100 text-black" : "bg-none"}`} to="/api/messages">Chats</NavLink>
                        <NavLink className={(e) => ` px-2 py-1 rounded-4xl font-semibold ${ e.isActive ? "bg-zinc-100 text-black" : "bg-none"}`} to="/login">Login</NavLink>
                        <NavLink className={(e) => ` px-2 py-1 rounded-4xl font-semibold ${ e.isActive ? "bg-zinc-100 text-black" : "bg-none"}`} to="/register">Register</NavLink>
                    </div>
                    <div className="w-1/4 h-full flex justify-center items-center ">
                        {/* Profile Section */}
                        <div className="w-10 h-10 bg-red-400 rounded-full">

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>)
}