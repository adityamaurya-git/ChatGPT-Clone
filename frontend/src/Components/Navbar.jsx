import { NavLink } from "react-router-dom"
import { useState } from 'react'
import { instance } from "../api/axios.config"
import { useSelector } from "react-redux"

export const Navbar = () =>{
    const [open, setOpen] = useState(false)

    const handleClick = async () =>{
        await instance.get('/api/auth/logout');
        window.location.reload();
    }

    const {isAuthenticated} = useSelector((state) =>{
        return state.user;
    })

    return(<>
    <nav className="w-full h-auto sm:h-20 p-2 flex justify-center items-center relative">
            <div className="w-full sm:w-3/4 h-full flex items-center justify-between overflow-hidden rounded-2xl sm:rounded-4xl bg-[#1D1D1D] px-2">
                <div className="w-auto sm:w-1/5 h-full flex items-center px-3 sm:px-0">
                    <h1 className="text-white font-bold text-lg sm:text-2xl px-2 py-2 font-mono">ChatGPT</h1>
                </div>
                <div className="flex-1 h-full flex items-center justify-between">
                    <div className="hidden sm:flex w-full h-full flex-wrap justify-center items-center gap-2 px-2 font-mono text-sm sm:text-base">
                        <NavLink className={(e) => ` px-2 py-1 rounded-4xl font-semibold ${ e.isActive ? "bg-zinc-100 text-black" : "bg-none"}`} to="/">Home</NavLink>
                        {isAuthenticated ? (
                            <>
                                <NavLink className={(e) => ` px-2 py-1 rounded-4xl font-semibold ${ e.isActive ? "bg-zinc-100 text-black" : "bg-none"}`} to="/api/messages">Chats</NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink className={(e) => ` px-2 py-1 rounded-4xl font-semibold ${ e.isActive ? "bg-zinc-100 text-black" : "bg-none"}`} to="/login">Login</NavLink>

                                <NavLink className={(e) => ` px-2 py-1 rounded-4xl font-semibold ${ e.isActive ? "bg-zinc-100 text-black" : "bg-none"}`} to="/register">Register</NavLink>
                            </>
                        )}

                        
                    </div>

                    <div className="hidden sm:flex items-center pr-3">
                        {/* Profile Section */}
                        <div onClick={handleClick} className="w-10 h-10 flex justify-center items-center bg-red-400 rounded-full cursor-pointer">
                            Out
                        </div>
                    </div>

                    {/* Mobile menu button - rightmost */}
                    <div className="sm:hidden absolute right-3 top-1/2 -translate-y-1/2">
                        <button onClick={()=>setOpen(!open)} aria-label="Open menu" className="p-2 rounded-md bg-zinc-800">
                            {open ? (
                                <svg className="w-6 h-6 text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            ) : (
                                <svg className="w-6 h-6 text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            )}
                        </button>
                    </div>
                </div>

            </div>

            {/* Mobile dropdown menu (placed below navbar) */}
            <div className={`sm:hidden absolute left-[2%] top-full w-[96vw] p-3 rounded-xl transition-all duration-200 bg-[#1D1D1D] ${open ? 'max-h-72 opacity-100 visible' : 'max-h-0 opacity-0 invisible overflow-hidden'}`}>
                <div className="flex flex-col gap-2">
                    <NavLink onClick={()=>setOpen(false)} className={(e) => ` px-3 py-2 rounded-lg font-semibold ${ e.isActive ? "bg-zinc-100 text-black" : "bg-none"}`} to="/">Home</NavLink>
                    <NavLink onClick={()=>setOpen(false)} className={(e) => ` px-3 py-2 rounded-lg font-semibold ${ e.isActive ? "bg-zinc-100 text-black" : "bg-none"}`} to="/api/messages">Chats</NavLink>
                    <NavLink onClick={()=>setOpen(false)} className={(e) => ` px-3 py-2 rounded-lg font-semibold ${ e.isActive ? "bg-zinc-100 text-black" : "bg-none"}`} to="/login">Login</NavLink>
                    <NavLink onClick={()=>setOpen(false)} className={(e) => ` px-3 py-2 rounded-lg font-semibold ${ e.isActive ? "bg-zinc-100 text-black" : "bg-none"}`} to="/register">Register</NavLink>
                </div>
            </div>
        </nav>
    </>)
}