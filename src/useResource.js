import {useEffect, useState} from "react";
import UserController from "./controllers/UserController.js";
import {fetchWithToken} from "./utilities/fetch.js";

export const useResource = ({ url, data}) =>{
    const [resource,setResource] = useState(null);
    useEffect(()=>{
        ( async ()=>{
            const response = await fetchWithToken(url,data);
            if(response.status === 'success'){
                setResource(response.data)
            }
        })();
    },[url,data])
    return resource;
}