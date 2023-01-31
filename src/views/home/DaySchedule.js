import {useEffect, useReducer, useRef, useState} from "react";
import ScheduleController from "../../controllers/ScheduleController.js";
import redirect from "../../utilities/redirect.js";
import './daySchedule.scss'
import {timeDurationToText, timestampToDay} from "../../utilities/utilities.js";
import {useNavigate, useParams} from "react-router-dom";
import ListItem from "../../components/lists/list-item/List-item.js";
import { ReactComponent as ThreeDots } from "../../scss/icons/threeDots.svg";
import { ReactComponent as Calendar } from "../../scss/icons/calendar.svg";
import {motion} from "framer-motion";
import TopNavBar from "../../components/navbars/top-nav-bar/Top-nav-bar.js";
import BottomNavBar from "../../components/navbars/bottom-nav-bar/Bottom-nav-bar.js";
import CheckBox from "../../components/checkBox/CheckBox.js";

export default function DaySchedule () {
    const { date } = useParams();
    const navigate = useNavigate();
    const dateInp = useRef();
    const fetchRan = useRef(false);
    const dayTimestamp = date ? new Date(date * 1000) : new Date().getTime();
    const initialState = { schedules :[] }
    const [ state,dispatch ] = useReducer( reducer,initialState );
    const [ checked,setChecked ] = useState([]);
    const [ schedules,setSchedules ]= useState([]);

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

    function handleDateChange()
    {
        let d = dateInp.current.value;
        fetchRan.current = false;
        redirect('/day-schedule/'+dayTimestamp.inpFormatToTimeStamp(d))
    }

    function tickSchedule(e,sObj)
    {
        ScheduleController.markSchedule( sObj.id , Number(!sObj.done)).then( resp=>
        {
            if( resp.status === 'success' ){
                e.target.checked = !sObj.done
                // dispatch({type :'markedAsCompleted' ,payload : sObj })

            }else{
                alert('Something wrong happened!')
            }
        })
    }

    function getSchedules(date)
    {
        ScheduleController.get(date).then(resp=>{
            if( resp.status === 'success' ){
                setSchedules(resp.data);
                // dispatch({ type:'loaded',payload : resp.data })
            }
            else alert(resp.error);
        })
    }
    async function handleCheckedBoxesChange(schedule) {
        const resp = await ScheduleController.markSchedule( schedule.id , Number(!schedule.done))
        if (resp.status === 'success') {

            if (checked.includes(schedule.id)) {
                setChecked(checked.filter((c) => c !== schedule.id));
            } else {
                setChecked([...checked, schedule.id]);
            }
        } else {
            //todo
        }

    }
    const getCompletedTasks = (tasks) => {
        const filteredData = tasks.filter((item) => item.done === 1);
        return (filteredData.map((item) => item.id));
    };

    useEffect(()=>{
        if( schedules.length > 0 ) {
            setChecked(getCompletedTasks(schedules))
        }
    },[schedules])
    console.log('checked:',checked)
    useEffect(()=>{

        if( fetchRan.current === false )
        {
            fetchRan.current = true;
            getSchedules(dayTimestamp );
        }
    },[ date,fetchRan.current ])

    return (<motion.div initial={{ width: 0 }}
                        animate={{ width:'100%' }}
                        exit={{ x: window.innerWidth,transition:{ duration: 0.1} }}
                        className='page'
    >
        <TopNavBar headline={ 'Your tasks for today' }>
            {/*<ListItem headline={'something'}*/}
            {/*          leading={  }*/}
            {/*/>*/}
            //todo
        </TopNavBar>
        <div className={'page-day-schedule'}>
            <ListItem overline={ 'Date'}
                      className={'date'}
                      divider={ true }
                      supportingText={ timestampToDay(dayTimestamp) }
                      trailing={ <span className='calendar-icon-wrapper'><Calendar/></span> }
            />
            <div id='plans-container'>
                {state.schedules?.length >0
                    ? state.schedules.map(x=>
                        <ListItem headline={ x.subject }
                                  key={ x.id }
                                  supportingText={ timeDurationToText(x.start,x.end) }
                                  leading={ <input type ='checkbox'
                                                   checked={ checked.includes(x.id) }
                                                   onChange={ ()=>handleCheckedBoxesChange(x) }
                                  />}
                                  trailing={ <span className={'dots-icon-wrapper'}><ThreeDots /></span> }
                        />)

                    :'Empty'
                }
            </div>
            {/*<button onClick={()=>{navigate(`/plan/new/${date}`)}}>*/}
            {/*    Add a New Task*/}
            {/*</button>*/}
            {/*<button onClick={()=>navigate('/performance/')}>Day performance</button>*/}
        </div>
        <BottomNavBar/>
    </motion.div>)
}
