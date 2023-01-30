import LoginController from "../../controllers/LoginController.js";
import {useUser} from "../../UserContext.js";
import redirect from "../../utilities/redirect.js";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useResource} from "../../useResource.js";
import {fetchWithToken} from "../../utilities/fetch.js";

export default function Login(){

    const [user,setUser] = useUser();
    const navigate = useNavigate();
    useEffect(()=>{
        (async ()=>{
            const user = await LoginController.checkAuthentication();
            if( user !== null ) {
                setUser(user)
                navigate('/home/')
            }
        })();
    },[])

    //TODO: Ask server if the user with sessionId which is saved in localStorage valid.
    // TODO: If so, setUser and redirect to home; Otherwise, show the login form.

    async function login() {

        const uname =document.getElementById('username-inp').value;
        const password = document.getElementById('password-inp').value;
        const result =  await LoginController.login(uname,password);
        setUser(result);
        navigate('/home/')

    }
    console.log(user);
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