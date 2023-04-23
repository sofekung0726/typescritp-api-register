<<<<<<< HEAD
import { getAlluser } from '../conn/users';
import express,{Router} from 'express';
import { inAuthentication } from '../middlewares';
import { updateUser } from '../conn/users';
import { deleteUser } from '../conn/users';
import { userid } from '../conn/users';
export default (route:Router)=>{
    route.get("/users",inAuthentication,getAlluser)
    route.get("/users/:id",inAuthentication,userid)
    route.patch("/users/:id",inAuthentication,updateUser)
    route.delete("/users/:id",inAuthentication,deleteUser)
=======
import { deleteUser, getAllUser,updateUser } from '../controllers/user';
import express,{Router} from 'express';
import { isAuthentication } from '../middlewares';
export default (route:Router)=>{
    route.get("/users",isAuthentication,getAllUser)
    // route.get("/users/:id",isAuthentication,getUserByMyId)
    route.patch("/users/:id",isAuthentication,updateUser)
    route.delete("/users/:id",isAuthentication,deleteUser)
>>>>>>> 76dfd0961e80501068b553e5deee88eba9dc43b1

}