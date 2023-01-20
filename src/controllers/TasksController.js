import {fetchWithToken} from "../utilities/fetch.js";
import {SystemMessage} from "../utilities/showMessage.js";

export default class TaskController {
    static async getAll() {
        let resp = await fetchWithToken('tasks/', {});
        if (resp.status === 'success') {
            return SystemMessage.sendData(resp.data)
        }else {
            return SystemMessage.error(resp.error)
        }
    }
    static async get(tId) {
        let resp = await fetchWithToken('tasks/', {
            id : tId,
        });
        if (resp.status === 'success') {
            return SystemMessage.sendData(resp.data)
        }else {
            return SystemMessage.error(resp.error)
        }
    }
    static async add(subject,desc='') {

        let resp = await fetchWithToken('tasks/',{
            subject : subject,
            desc :  desc,
            _method:'PUT'
        },'post');

        if(resp.status === 'success') {
            return SystemMessage.success(resp.data.id);
        } else {
            return SystemMessage.error(resp.error);
        }

    }
    static async update(tId,name ,desc='') {

        let resp = await fetchWithToken('tasks/', {
            taskId: tId,
            desc: desc,
            subject : name,
            _method: 'PUT',
        });

        if (resp.status === 'success') {
            return SystemMessage.success();
        } else {
            return SystemMessage.error(resp.error);
        }
    }

    static async delete(tId) {
        let req = await fetchWithToken('tasks/',{
            _method : 'DELETE',
            id : tId,
        })
        if (req.status === 'success') {
            return SystemMessage.success(req.data);
        } else {
            return SystemMessage.error(req.error);
        }
    }

}
