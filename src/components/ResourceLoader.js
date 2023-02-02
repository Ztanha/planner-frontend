import { useEffect,useState } from "react";
import {fetchWithToken} from "../utilities/fetch.js";

export const ResourceLoader = ({ resourceUrl, resourceName, children, data={}, methodType })=>{
    const [ state,setState ]= useState(null)

    useEffect( ()=>{
        (async ()=> {
            const response = await fetchWithToken( resourceUrl, data, methodType);
            setState( response.data )
        })();
    },[ resourceUrl ])
    return (
        state ? React.Children.map(children, child =>{
                        if(React.isValidElement(child)) {
                            return <React.Fragment key={children}>
                                { React.cloneElement(child, { [resourceName]: state }) }
                            </React.Fragment>
                        }
                        return child;
                    })
                : ''
    )
}
