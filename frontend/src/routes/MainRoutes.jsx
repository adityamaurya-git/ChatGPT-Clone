import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { CreateChat } from "../pages/CreateChat"
import  {Home}  from "../pages/Home"
import { ShowChat } from "../pages/ShowChat"
import { ProtectedRoutes } from "./ProtectedRoutes"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { currentUserAction } from "../store/actions/userAction"



export const MainRoutes = () =>{

    const dispatch = useDispatch();

  useEffect(() => {
        dispatch(currentUserAction());
    }, []);

    const {isAuthenticated} = useSelector((state) =>{
        return state.user;
    })
    
    // console.log(isAuthenticated)

    return(<>
        <Routes>
            <Route path="/" element={<Home/>}/>
        
            <Route path="/create/chat" element={<ProtectedRoutes><CreateChat/></ProtectedRoutes>}/>
            <Route path="/api/messages/:chatId" element={<ProtectedRoutes><ShowChat/></ProtectedRoutes>}/>
            <Route path="/api/messages" element={<ProtectedRoutes><ShowChat/></ProtectedRoutes>}/>

            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
                
        </Routes>
    </>)
}