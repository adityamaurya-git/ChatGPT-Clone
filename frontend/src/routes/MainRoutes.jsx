import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { CreateChat } from "../pages/CreateChat"
import  {Home}  from "../pages/Home"
import { ShowChat } from "../pages/ShowChat"


export const MainRoutes = () =>{

    return(<>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/create/chat" element={<CreateChat/>}/>
            <Route path="/api/messages/:chatId" element={<ShowChat/>}/>
            <Route path="/api/messages" element={<ShowChat/>}/>
        </Routes>
    </>)
}