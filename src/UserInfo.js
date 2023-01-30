import {useEffect, useState} from "react";
import {useResource} from "./useResource.js";

export const UserInfo = () =>{

    const [user,setUser] = useState(null);
    useEffect(()=>{
        ( async ()=>{
            const result = await useResource({url:'users/get/',data: {}})
            if(result.status === 'success') {
                setUser( result.data)
            }

        })();
    },[])
    return user;
}