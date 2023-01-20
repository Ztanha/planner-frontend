import {fetchWithToken} from "../utilities/fetch.js";
import {SystemMessage} from "../utilities/showMessage.js";

export class AutoScheduleController {

    static async add(planId,weekdays){

        let resp = await fetchWithToken('autoSchedules/', {
            planId : planId,
            weekdays : weekdays,
            _method : 'PUT'
        });

        if (resp.status === 'success') {
            return SystemMessage.success(resp.data);
        } else {
            return SystemMessage.error(resp.error);
        }
    }
    static async update(scheduleId,weekdays,planId=null){
        let resp = await fetchWithToken('autoSchedules/', {
            scheduleId : scheduleId,
            weekdays : weekdays,
            planId : planId,
            _method : 'PUT'
        });

        if (resp.status === 'success') {
            return SystemMessage.success(resp.data);
        } else {
            return SystemMessage.error(resp.error);
        }
    }

    static async get(sIds=[]) {

        let resp = await fetchWithToken('autoSchedules/',
            sIds.length >0
                ? {sIds:sIds}
                : {}
        );
        if (resp.status === 'success') {
            return SystemMessage.sendData(resp.data);
        } else {
            return SystemMessage.error(resp.error);
        }
    }

    static async delete(sId) {
        let resp = await fetchWithToken('autoSchedules/', {
            scheduleId : sId,
            _method : 'DELETE',
        });
        if (resp.status === 'success') {
            return SystemMessage.success(resp.data);
        } else {
            return SystemMessage.error(resp.error);
        }
    }
}
