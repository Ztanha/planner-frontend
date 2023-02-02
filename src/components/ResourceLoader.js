import { useEffect,useState } from "react";
import {fetchWithToken} from "../utilities/fetch.js";
import withLoading from "./hocs/withLoading.js";

export const ResourceLoader = ({ resourceUrl, resourceName, children, postData={}, methodType })=>{
    const [ respData,setRespData ]= useState(null)
    const WrappedData = withLoading(PrintComponent, respData);
    useEffect( ()=>{
        (async ()=> {
            try {
                const response = await fetchWithToken(resourceUrl, postData, methodType);
                setRespData(response.data)
            }catch (e) {
                setRespData({error: e.message});
            }
        })();
    },[ resourceUrl ]);

    return <WrappedData data={respData} resourceName={resourceName} >{children}</WrappedData>
}


function PrintComponent({data, resourceName, children}){
    return React.Children.map(children, child =>{
        return (React.isValidElement(child))
            ? React.cloneElement(child, { [resourceName]: data })
            : child;
    });
}