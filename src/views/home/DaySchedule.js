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
import DatePicker from "react-date-picker-material";

export default function DaySchedule () {
    const { date } = useParams();
    const navigate = useNavigate();
    const dateInp = useRef();
    const fetchRan = useRef(false);
    const dayTimestamp = date ? new Date(date * 1000) : new Date().getTime();
    const [ checked,setChecked ] = useState([]);
    const [ schedules,setSchedules ]= useState([]);
    const [ dateToLoad, setDateToLoad ] = useState('');
    const [ datePickerShow,setDatePickerShow ] = useState(false);

    function getSchedules(date)
    {
        ScheduleController.get(date).then(resp=>{
            if( resp.status === 'success' ){
                setSchedules(resp.data);
            }
            else alert(resp.error);
        })
    }
    function onDateChange() {
        fetchRan.current = false;
        navigate('/day-schedule/'+dayTimestamp.inpFormatToTimeStamp(dateToLoad))
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
                { schedules?.length >0
                    ? schedules.map(x=>
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
        <DatePicker date={ dateToLoad }
                    // show={ datePickerShow }
                    // hide={ setDatePickerShow}
                    setDate={ setDateToLoad }
                    selectDate={ onDateChange }
        />
        <BottomNavBar/>
    </motion.div>)
}
