import {useEffect, useState} from "react";
import UserController from "./controllers/UserController.js";
import {fetchWithToken} from "./utilities/fetch.js";

export const useResource = (props) =>{
    const [resource,setResource] = useState(null);
    useEffect(()=>{
        ( async ()=>{
            const response = await fetchWithToken(props.url,props.data);
            if(response.status === 'success'){
                setResource(response.data)
            }
        })();
    },[props])
    return resource;
}