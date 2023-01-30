import {useEffect, useState} from "react";
import {useResource} from "./useResource.js";

export const UserInfo = () =>{

    const [user,setUser] = useState(null);
    useEffect(()=>{
        ( async ()=>{
            const user = await useResource({url:'users/get/',data: {}})

        })();
    },[])
    return user;
}