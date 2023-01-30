import LoginController from "../../controllers/LoginController.js";
import {useUser} from "../../UserContext.js";

export default function Login(){

    async function login() {

        const uname =document.getElementById('username-inp').value;
        const password = document.getElementById('password-inp').value;
        const [user,setUser] = useUser();

        LoginController.login(uname,password).then(resp=>{

            if(resp?.error){
                alert(resp.error)
            }else{
                setUser(resp.data)
            }
        })

    }
    return (<div id='page-login'>
        <div id='title'></div>
        <div id='inputs-container'>
            <label htmlFor='username-inp'>Username:</label>
            <input id='username-inp' />
            <label htmlFor='password-inp'>Password:</label>
            <input type='password' id='password-inp' />
            <button onClick={login}>Login</button>
        </div>
    </div>)
}