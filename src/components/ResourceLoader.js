import { useEffect,useState } from "react";
import {fetchWithToken} from "../utilities/fetch.js";

export const ResourceLoader = ({ resourceUrl, resourceName, children })=>{
    const [ state,setState ]= useState(null)

    useEffect( ()=>{
        (async ()=> {
            const response = await fetchWithToken(resourceUrl);
            setState( response.data )
        })();
    },[resourceUrl])
    return (
        <>
            {React.Children.map(children, child =>{
                if(React.isValidElement(child)) {
                    return React.cloneElement(child, { [resourceName]: state })
                }
                return child;
            })}
        </>
    )
}
