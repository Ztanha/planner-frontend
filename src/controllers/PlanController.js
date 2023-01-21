import {fetchWithToken} from "../utilities/fetch.js";
import {SystemMessage} from "../utilities/showMessage.js";

export default class PlanController {

    static async add(tasksIds, start=-1, end=-1) {

        let resp = await fetchWithToken('plans/', {
            tasksIds: tasksIds,
            start: Number(start),
            end: Number(end),
            _method:'PUT'
        })

        if(resp.status === 'success') {
            return SystemMessage.sendData(resp.data);

        }else{
            return SystemMessage.error('Sorry! Something went wrong');
        }

    }
    static async get(pId) {
        let resp = await fetchWithToken('plans/', {
            planId: pId,
        },'get')
        if(resp.status === 'success') {
            return SystemMessage.success('');

        }else{
            return SystemMessage.error('Sorry! Something went wrong');
        }
    }

    static async update(pId,start,end,taskId ) {

        let resp = await fetchWithToken('plans/', {
            planId: pId,
            start: Number(start),
            end: Number(end),
            taskId: taskId, //can be null in case we don't want to change tId
            _method:'PUT'
        })
        if(resp.status === 'success') {
            return SystemMessage.success(pId);

        }else{
            return SystemMessage.error('Sorry! Something went wrong');
        }
    }
    static delete(pId) {
        let resp = fetchWithToken('plans/delete',{
            planId: pId,
            _method : 'DELETE',
        })
        if(resp.status === 'success') {
            return SystemMessage.success('');

        }else{
            return SystemMessage.error('Sorry! Something went wrong');
        }
    }
}
