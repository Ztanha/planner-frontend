
function getAPIUrl(methodName){
    return 'http://127.0.0.1:8000/api/' + methodName;
}

export async function fetchWithToken(methodName,data={},methodType='post') {

    return new Promise(function (resolve, reject){
        const errorReject = function (e) {
            reject('Connection Problem...',e);
        };
        const postBody= new FormData();
        let hdr= new Headers();

        data.sessionId = localStorage.getItem('sessionId');

        for (let [key, value] of Object.entries(data)){

            if(typeof value === 'object') value = JSON.stringify(value)
            postBody.append(key,value)

        }
        fetch(getAPIUrl(methodName),{
            mode : 'cors',
            method: methodType.toUpperCase(),
            body:postBody,
            credentials: "include",
            headers:hdr

        }).then(async resp=>{

            const jsonResp = await resp.json();
            resolve(jsonResp);

        }).catch(errorReject);
    })
}

