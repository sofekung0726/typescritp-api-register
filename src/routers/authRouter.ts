
import { login ,logout,register } from '../conn/authenticationConn';
import { login, register,logout } from '../controllers/authenticationControtroller';
import express,{Router} from 'express';

export default (route:Router)=>{
    route.post("/auth/register",register)
    route.post("/auth/login",login)
    route.get("/auth/logout",logout)
}