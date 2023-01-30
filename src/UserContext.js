import {createContext,useContext, useEffect, useState} from "react";
import {useResource} from "./useResource.js";

const UserContext = createContext(null);
const UserProvider= (props)=>{
    const [user,setUser] = useState(null);

    // useEffect(()=>{
    //     ( async ()=>{
    //         const result = await useResource({url:'users/get/',data: {}})
    //         if(result.status === 'success') {
    //             setUser( result.data)
    //         }
    //
    //     })();
    // },[])
    return <UserContext.Provider {...props} value={[user,setUser]}/>
}
function useUser() {
    const context = useContext(UserContext);
    if(!context) throw new Error('Not inside the provider.')
    return context;
}

export {UserProvider,useUser}