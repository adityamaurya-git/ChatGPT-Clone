import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({children}) =>{

    const {isAuthenticated} = useSelector((state) =>{
        return state.user;
    })

    const isLoggedIn = isAuthenticated;

    return isLoggedIn ? children : <Navigate to="/login" />
}