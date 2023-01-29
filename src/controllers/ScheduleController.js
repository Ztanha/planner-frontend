import {fetchWithToken} from "../utilities/fetch.js";
import {SystemMessage} from "../utilities/showMessage.js";

export default class ScheduleController {

    static async delete(scheduleId){
        let temp = await fetchWithToken('schedules/', {
            scheduleId: scheduleId,
            _method : 'DELETE'
        })
        if (temp.status === 'success') {
            return SystemMessage.success('done');
        } else {
            return SystemMessage.error(temp.error)
        }
    }

    static async get(date1,date2='') {

        let resp;

        if(date1 === ''){

        }
        if(date2 !== '') {
            resp = await fetchWithToken('schedules/', {
                date: date1,
                date2: date2,
            })
        }else{
            resp = await fetchWithToken('schedules/', {
                date: date1,
            })
        }

        if (resp.status === 'success') {
            return SystemMessage.sendData(resp.data);
        } else {
            return SystemMessage.error(resp.error)
        }
    }

    static async markSchedule(scheduleId, done) {

        let temp = await fetchWithToken('schedules/', {
            scheduleId : scheduleId,
            done : +done,
            _method : 'PUT'
        })
        if (temp.status === 'success') {
            return SystemMessage.success(temp.data);
        } else {
            return SystemMessage.error(temp.error)
        }
    }


    static async add(plansIds, date) {

        let req = await fetchWithToken('schedules/', {
            plansIds:plansIds,
            date:Math.floor(date/1000),
            _method: 'PUT'
        })
        if (req.status === 'success') {
            return SystemMessage.success(req.data);
        } else {
            return SystemMessage.error(req.error)
        }
    }

}
