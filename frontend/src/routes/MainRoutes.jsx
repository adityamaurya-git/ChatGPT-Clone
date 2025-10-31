import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { CreateChat } from "../pages/CreateChat"
import  {Home}  from "../pages/Home"
import { ShowChat } from "../pages/ShowChat"
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

    return(<>
        <Routes>
            <Route path="/" element={<Home/>}/>
            {isAuthenticated ? (<>
                <Route path="/create/chat" element={<CreateChat/>}/>
                <Route path="/api/messages/:chatId" element={<ShowChat/>}/>
                <Route path="/api/messages" element={<ShowChat/>}/>
            </>) : (<>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </>)}

                
        </Routes>
    </>)
}