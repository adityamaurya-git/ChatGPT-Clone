import axios from 'axios'

export const instance = axios.create({
    baseURL:"https://chatgpt-clone-ped1.onrender.com/",
    withCredentials: true,
})