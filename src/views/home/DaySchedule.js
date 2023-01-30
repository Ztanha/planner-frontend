import {useEffect, useReducer, useRef, useState} from "react";
import ScheduleController from "../../controllers/ScheduleController.js";
import redirect from "../../utilities/redirect.js";
import dayTimestamp from "../../utilities/dayTimestamp.js";
import ScheduleContainer2 from "../../components/scheduleContainer/ScheduleContainer2.js";
import {normalizeDate, timeDurationToText, timestampToDay} from "../../utilities/utilities.js";
import {useParams} from "react-router-dom";
import ListItem from "../../components/lists/list-item/List-item.js";
import { ReactComponent as ThreeDots } from "../../scss/icons/threeDots.svg";
import { ReactComponent as Calendar } from "../../scss/icons/calendar.svg";
import {motion} from "framer-motion";

export default function DaySchedule () {
    const { date } = useParams();
    const dateInp = useRef();
    const fetchRan = useRef(false);
    const [ input,setInput ] = useState('');
    const dayTimestamp = date ? new Date(date * 1000) : new Date().getTime();
    const initialState = { schedules :[] }
    const [ state,dispatch ] = useReducer( reducer,initialState );

    function reducer(state,action) {
        function sortSchedules(arr)
        {
            arr =arr.sort(function (a,b) {
                if(a.id > b.id) return 1
                return -1
            })
            return arr
        }

        function filterSchedules(id) {
            return state.schedules.filter(x => x.id !== id);
        }

        function completeSchedule ( schedule )
        {
            schedule.done = Number( !schedule.done );
            return schedule
        }

        switch (action.type) {
            case 'loaded':
                return {
                    schedules : action.payload
                }
            case 'edited':
                return {
                    schedules: sortSchedules(
                        [...filterSchedules( action.payload.id ),action.payload]
                    )
                }
            case 'markedAsCompleted':
                return {
                    schedules: sortSchedules(
                        [...filterSchedules( action.payload.id ),completeSchedule( action.payload )]
                    )
                }
            case 'deleted':
                return {
                    schedules: filterSchedules( action.payload )
                }
            default:
                break;

        }
    }
    // console.log(state.schedules)

    function handleDateChange()
    {
        let d = dateInp.current.value;
        fetchRan.current = false;
        redirect('/day-schedule/'+dayTimestamp.inpFormatToTimeStamp(d))
    }

    function tickSchedule(sObj)
    {
        ScheduleController.markSchedule( sObj.id , Number(!sObj.done)).then( resp=>
        {
            if( resp.status === 'success' ){
                dispatch({type :'markedAsCompleted' ,payload : sObj })

            }else{
                alert('Something wrong happened!')
            }
        })
    }

    function getSchedules(date)
    {
        ScheduleController.get(date).then(resp=>{
            if( resp.status === 'success' ){
                console.log(resp.data)
                dispatch({ type:'loaded',payload : resp.data })
            }
            else alert(resp.error);
        })
    }

    useEffect(()=>{

        if( fetchRan.current === false )
        {
            // setInput(<input type='date'
            //                 value={day.getFullYear()+'-'+normalizeDate(day.getMonth()+1)+'-'+normalizeDate(day.getDate())}
            //                 ref={dateInp}
            //                 onChange={handleDateChange}
            // />)
            fetchRan.current = true;
            getSchedules(dayTimestamp );
        }
    },[ date,fetchRan.current ])

    return (<motion.div initial={{ width: 0 }}
                        animate={{ width:'100%' }}
                        exit={{ x: window.innerWidth,transition:{ duration: 0.1} }}
                        className='page day-schedule'
    >
        <>
            <div id='title'>
                Your Plans For<br/>
                <label>date:</label>
                {input}
            </div>
        </>
        <ListItem overline={ 'Date'}
                  divider={ true }
                  supportingText={ timestampToDay(dayTimestamp) }
                  trailing={ <Calendar/> }
        />
        <div id='plans-container'>
            {state.schedules?.length >0
                ? state.schedules.map(x=>
                    <ListItem headline={ x.subject }
                              key={ x.id }
                              supportingText={ timeDurationToText(x.start,x.end) }
                              leading={ <input type={ "checkbox" } checked={ x.done }/>}
                              trailing={ <ThreeDots/> }
                    />)

                :'Empty'
            }
        </div>
        <button onClick={()=>{redirect('/plan/new/'+date)}}>
            Add a New Task
        </button>
        <button onClick={()=>redirect('/performance/')}>Day performance</button>
        {/*<NavigationBar/>*/}
    </motion.div>)
}
