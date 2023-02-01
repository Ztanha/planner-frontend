import IconText from "./icon/icon&text/Icon&text.js";
import ListItem from "./lists/list-item/List-item.js";
import {ReactComponent as ClockIcon} from "../scss/icons/clock.svg";
import {Time} from "../utilities/time.js";

export const ScheduleListItems = ({schedule}) =>{

    function getTime(start,end){
        const s = Time.decode(start);
        const e = Time.decode(end)
        return s.hour+':'+s.minute+ ' - '+ e.hour+':'+e.minute
    }
    return (
        schedule ? (
                <ListItem headline={schedule.subject}
                          key={schedule.id}
                          trailing={' '}
                          supportingText={<IconText
                              icon={<ClockIcon/>}
                              text={getTime(schedule.start,schedule.end)}
                          />}
                />
            )
            : <ListItem supportingText={'No task yet'}
                        trailing={' '}
            />
    )
}