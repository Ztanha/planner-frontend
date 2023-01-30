import {fetchWithToken} from "../utilities/fetch.js";

export default class UserController{
    static async getName() {
        return await fetchWithToken('users/get/', {}, 'post',);
    }
    static async get() {

    }
}