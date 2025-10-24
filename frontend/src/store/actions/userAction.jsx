import {instance} from '../../api/axios.config'
import { loginFail, loginSuccess, setLoading, setUser } from '../reducers/userSlice';



// Register User Action *************

export const registerUserAction = (registerData) => async (dispatch , getstate) =>{
    try{
        dispatch(setLoading());
        const {data} = await instance.post('/api/auth/register' , registerData)
        console.log("Register Response" , data);
        dispatch(loginSuccess(data.user));
        return data;
    }catch(err){
        const message = err?.message?.data?.message || "Something went wrong";
        dispatch(loginFail(message));
        throw err;
    }
}

// Login User Action *************

export const loginUserAction = (loginData) => async (dispatch , getstate) =>{
    try{
        dispatch(setLoading());
        const {data} = await instance.post('/api/auth/login' , loginData)
        // console.log("Login Response" , data);
        if(data.user){
            dispatch(loginSuccess(data.user));
        }
        return data;
    }catch(err){
        const message = err?.message?.data?.message || "Something went wrong";
        dispatch(loginFail(message));
        throw err;
    }
}

// Current User Action *************

export const currentUserAction = () => async (dispatch , getstate) =>{
    try{
        dispatch(setLoading());
        const {data} = await instance.get('/api/auth/current-user');
        // console.log("currentUser Response" , data);
        if(data.user){
            dispatch(setUser(data.user));
        }
        return data;
    }catch(err){
        dispatch(setUser(null));
        // console.log("Error in currentUserAction" , err);
        return null;
    }
}