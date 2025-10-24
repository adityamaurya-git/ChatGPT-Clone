import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { CreateChat } from "../pages/CreateChat"
import  {Home}  from "../pages/Home"
import { ShowChat } from "../pages/ShowChat"
import { ProtectedRoutes } from "./ProtectedRoutes"
import { useSelector } from "react-redux"



export const MainRoutes = () =>{

    const {isAuthenticated} = useSelector((state) =>{
        return state.user;
    })
    
    // console.log(isAuthenticated)

    return(<>
        <Routes>
            <Route path="/" element={<Home/>}/>
            {isAuthenticated &&<>
                <Route path="/create/chat" element={<ProtectedRoutes><CreateChat/></ProtectedRoutes>}/>
                <Route path="/api/messages/:chatId" element={<ProtectedRoutes><ShowChat/></ProtectedRoutes>}/>
                <Route path="/api/messages" element={<ProtectedRoutes><ShowChat/></ProtectedRoutes>}/>
            </>}
            

            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
                
        </Routes>
    </>)
}