import LoginController from "../../controllers/LoginController.js";
import {useUser} from "../../UserContext.js";

export default function Login(){

    const [user,setUser] = useUser();

    async function login() {

        const uname =document.getElementById('username-inp').value;
        const password = document.getElementById('password-inp').value;
        const resp = await LoginController.login(uname,password);
        if(resp.status === 'success'){
            setUser(resp.user)
        }else{
            alert(resp.error)
        }
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