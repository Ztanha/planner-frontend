import {useEffect, useState} from "react";
import UserController from "./controllers/UserController.js";

export const useCurrentUser = () =>{
    const [user,setUser] = useState(null);
    useEffect(()=>{
        (async ()=>{
            const response = await  UserController.getName();
            if(response.status === 'success'){
                setUser(response.data)
            }
        })();
    },[])
    return user;
}