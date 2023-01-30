
import {SystemMessage} from "../utilities/showMessage.js";
import {fetchWithToken} from "../utilities/fetch.js";
import redirect from "../utilities/redirect.js";
import dayTimestamp from "../utilities/dayTimestamp.js";

export default class LoginController {


    static async login(uname,pass) {


        const resp= await fetchWithToken('users/',{

            email:uname,
            password:pass,

        },'post')

        if(resp.status==='success'){

            localStorage.setItem('sessionId',resp.sessionId);
            return resp.user
            // redirect('/home/')

        }else{
            return SystemMessage.error(resp.error)
        }

    }
    logout(){

    }
    static async checkAuthentication() {

        const res = await fetchWithToken('users/get',{
            sessionId: localStorage.getItem('sessionId')
        })
        if(res.status === 'success')return res.data
        return null;
    }

}