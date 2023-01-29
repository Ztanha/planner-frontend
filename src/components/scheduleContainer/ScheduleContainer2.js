import {Time} from "../../utilities/time.js";
import React, {useState} from "react";
import ScheduleController from "../../controllers/ScheduleController.js";
import TimesInputs from "../inputs/TimesInputs.js";
import PlanController from "../../controllers/PlanController.js";

export default function ScheduleContainer(props) {

    const [ startVal , setStartVal ] = useState();
    const [ endVal , setEndVal ] = useState();

    function handleDelete(sId) {

        ScheduleController.delete(sId).then(resp=>{
            if(resp.status==='success') {
                props.dispatch({type:'deleted',payload: props.schedule.id})
            }else{
                //todo
            }
        })
    }

    function saveTimeChanges(start,end) {

        PlanController.update(props.schedule.plan_id,start,end).then(resp=>{
            if(resp.status === 'success'){

                props.schedule.start = start;
                props.schedule.end = end;

                setStartVal();
                setEndVal();

                props.dispatch({type:'edited',payload: props.schedule})


            }
        })
    }

    return (<>
        <div>
            {props.checkboxType === true
                //for schedules which belong to future and don't need checkbox
                ? <><input
                    defaultChecked ={props.schedule['done']}
                    type='checkbox'
                    onChange={ ()=>props.tick(props.schedule) }
                />
                {props.schedule['subject']}</>

                : <span key={ props.schedule.subject }>
                            { props.schedule.subject }
                        </span>
            }
            <button onClick= { ()=>handleDelete(props.schedule['id']) }>
                Delete
            </button>
            <br/>
            <TimesInputs
                startValue = { startVal }
                endValue = { endVal }
                saveChanges = { saveTimeChanges }
                setStartValue = { setStartVal }
                setEndValue = { setEndVal }
                // startInit = { Time.decode(props.schedule["start"]) }
                // endInit = { Time.decode(props.schedule["end"]) }
            />
            <hr/>
        </div>
    </>)
}