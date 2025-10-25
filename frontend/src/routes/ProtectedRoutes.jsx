import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({children}) =>{

    const {isAuthenticated , isLoading} = useSelector((state) =>{
        return state.user;
    })

    const isLoggedIn = isAuthenticated;

    if(isLoading){
        return <div>Loading...</div>
    }

    if(!isLoggedIn){
        return <Navigate to="/login" replace/>;
    }
    
    return children;
}