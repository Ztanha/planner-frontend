import TopNavBar from "../../../components/navbars/top-nav-bar/Top-nav-bar.js";
import ListItem from "../../../components/lists/list-item/List-item.js";
import React, {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {ReactComponent as Plus} from "../../../scss/icons/plus.svg";
import {useParams} from "react-router-dom";
import {AutoScheduleController} from "../../../controllers/AutoScheduleController.js";
import Button from "../../../components/buttons/common-buttons/Button.js";
import {ReactComponent as Calendar} from "../../../scss/icons/today-tasks.svg";
import {ReactComponent as Clock} from "../../../scss/icons/clock.svg";
import {ReactComponent as Notice} from "../../../scss/icons/notice.svg";
import './automation.scss'
import BottomNavBar from "../../../components/navbars/bottom-nav-bar/Bottom-nav-bar.js";
import TaskController from "../../../controllers/TasksController.js";
import {TimeHandler} from "../../../components/modals/timeHandler/TimeHandler.js";
import {Time} from "../../../utilities/time.js";
import {WeekdayChips} from "../../../components/weekdayChips/WeekdayChips.js";
import Dialog from "../../../components/dialog/Dialog.js";
import PlanController from "../../../controllers/PlanController.js";
import {goBack} from "../../../utilities/redirect.js";
import SnackBar from "../../../components/snack-bar/Snack-bar.js";
import {TaskSubject} from "../../../components/taskSubject/TaskSubject.js";

export default function Automation(){

    const params = useParams();
    const [ timingText,setTimingText ] = useState('Ex. from 9 am to 10 am');
    const [ startTimeValue,setStartTimeValue ] = useState('0000');
    const [ endTimeValue,setEndTimeValue ] = useState('0000');
    const [ activeWeekdays,setActiveWeekdays ] = useState('');
    const [ dialogMsg,setDialogMsg ] = useState('');
    const [ snackBarMsg,setSnackBarMsg ] = useState('');
    const schedule = useRef();
    const tId = params.tId || '';
    const sId = params.sId || '';
    const pageFetch = useRef(false);
    const [taskSubject,setTaskSubject] = useState('');
    const [timeHandlerShow,setTimeHandlerShow]= useState(false);
    const [dialogShow,setDialogShow]= useState(false);
    const [snackBarShow,setSnackBarShow]= useState(false);
    const [allTasks,setAllTasks]=useState([]);

    function adjustTimingText(start, end){

        const startVal = Time.decode( start );
        const endVal = Time.decode( end );
        setTimingText(`From ${ startVal.hour%12 } : ${ startVal.minute } ${ startVal.hour > 12 ? 'pm' : 'am' }
        to ${ endVal.hour%12 } : ${ endVal.minute } ${ endVal.hour > 12 ? 'pm' : 'am' }`)
    }

    function handleDialog( type='dialog',text ,title=null ) {

        setTimeHandlerShow(false);
        if(type === 'dialog') {
            setDialogMsg(text); //todo title
            setDialogShow(true);
        }else if(type === 'snackBar') {
            setSnackBarMsg(text)
            setSnackBarShow(true)
        }else{
            console.log('dialog message type is not correct')
        }
    }

    function handleTimeChange(start,end){

        const duration = Time.subtract(start,end);

        if( duration.hours !== '00' && duration.mins !== '00' ) {
            if (duration.hours < 0) {
                handleDialog('dialog','End time cannot happen before start time!');
                return
            }
        }
        setStartTimeValue(start);
        setEndTimeValue(end)
        adjustTimingText(start,end)
        setTimeHandlerShow(false)
    }
    async function savePlan( start,end,taskId,pId='' ) {

        let resp;
        if(pId){
            resp = await PlanController.update(pId,start, end,[taskId])
            if (resp.status === 'success') return pId;
            else handleDialog('dialog',resp.error)
        }else{
            resp = await PlanController.add([taskId], start, end)
            if (resp.status === 'success') return resp.data[0]
            else handleDialog('dialog',resp.error)
        }
    }
    async function saveSchedule(pId,sId='') {
        let resp;
        if(sId){
            return await AutoScheduleController.update( sId,activeWeekdays,pId );

        }else{
            return await AutoScheduleController.add(pId, activeWeekdays);
        }

    }
    function checkInputs(){

        if (activeWeekdays.indexOf('1') === -1) {
            handleDialog('dialog','Please select the days you want to repeat the auto schedule.')
            return false;
        }
        if( taskSubject.length === 0 ){
            handleDialog('dialog','Please fill the input related to subject of the task')
            return false;
        }
        return true;
    }
    async function getTask(){
        const task = allTasks.find( x=>x.subject === taskSubject );
        if( Object.values(task).length === 0 ) {
            const result = await TaskController.add(taskSubject, '');
            if(result.status === 'success') return result.data
            else handleDialog('dialog','Something wrong happened!')
            return;
        }
        return task.id
    }

    async function handleSave() {

        let result;
        if(!checkInputs()) return;
        const start = startTimeValue === '0000' ? -1 : startTimeValue;
        const end = endTimeValue === '0000' ? -1 : endTimeValue;
        const taskId = getTask();

        if ( schedule.current !== undefined ) {
            let pId;
            if( start === schedule.current.start && end === schedule.current.end && schedule.current.subject === taskSubject ){
                pId = schedule.current.plan_id;
            }else{
                pId = await savePlan(start, end, taskId, schedule.current.plan_id);
            }

            result = await saveSchedule(pId,schedule.current.id)

        } else {
            const pId = await savePlan(start, end, taskId);
            result = await saveSchedule( pId )
        }
        if (result.status === "error") {
            handleDialog( 'dialog','Something wrong happened!')
        }else{
            handleDialog( 'snackBar','Saved!' )
        }
    }

    useEffect(()=>{

        if( pageFetch.current === false ){
            TaskController.getAll().then(resp=>{
                if(resp.status === "success") {
                    const allTasks = resp.data;
                    setAllTasks(allTasks);
                }
            })
            if( sId ){
                AutoScheduleController.get([sId]).then(x => {
                    if (x.status === 'success') {
                        const s = x.data[0];
                        schedule.current = s;
                        setTaskSubject(s.subject)
                        setStartTimeValue(s.start)
                        setEndTimeValue(s.end)
                        adjustTimingText(s.start,s.end)
                        setActiveWeekdays(s.weekdays)
                    }
                })

            }else if( tId ){
                const task = allTasks.find(x=>x.id === tId);
                if( task.length > 0 ) setTaskSubject( task.subject )
            }
            pageFetch.current = true;
        }
    },[pageFetch])

    return (
        <motion.div initial={{ width: 0 }}
                        animate={{ width:'100%' }}
                        exit={{ x: window.innerWidth,transition:{ duration: 0.1} }}
                        className='page'
        >
            <TopNavBar headline={ sId !== null ? 'Automation' :'New Automation' }>
                <ListItem headline={'something'}
                  leading={ <Plus/> }
                />
            </TopNavBar>
            <div className='automation-page'>
                { taskSubject
                    ? <TaskSubject task={ taskSubject }
                                   setTask={ setTaskSubject }
                                   allTasks={ allTasks }
                    />
                    : ''
                }
                <ListItem leading = { <Clock/> }
                          headline = { 'Timing' }
                          supportingText = { timingText }
                          divider={ true }
                          click={ ()=>setTimeHandlerShow(true) }
                />
                <div className='weekdays-container'>
                    <ListItem leading = { <Calendar/> }
                              headline = {'Days'}
                              divider={ false}
                              trailing = {' '}
                    />
                    <WeekdayChips activeDays={ activeWeekdays }
                                  setActiveDays={ setActiveWeekdays }
                    />
                </div>

                <div className='save-button'>
                    { schedule.current
                        ?
                        <Button type = { 'outline' }
                                size = { 'big' }
                                click = { handleSave }
                        >
                            Delete
                        </Button>
                        :
                        ''
                    }
                    <Button type = { 'filled' }
                            size = { 'big' }
                            click = { handleSave }
                    >Save
                    </Button>
                </div>
                <TimeHandler modalShow={ timeHandlerShow }
                             setModalShow={ setTimeHandlerShow }
                             firstClockValue={ startTimeValue }
                             secondClockValue={ endTimeValue }
                             onChange={ handleTimeChange }
                />
            </div>
            <Dialog icon={ <Notice/> }
                    show={ dialogShow }
                    hide={ ()=>setDialogShow(false) }
                    title={ 'Oops' }
                    buttons= {<>
                        <Button type={'text'}
                                click={ ()=>setDialogShow(false) }>
                            OK
                        </Button>
                    </>}
            >
                { dialogMsg }
            </Dialog>
            <SnackBar show={ snackBarShow }
                      supportingText={ snackBarMsg }
                      setShow={ setSnackBarShow }
            />
            <BottomNavBar/>
        </motion.div>
    )
}
