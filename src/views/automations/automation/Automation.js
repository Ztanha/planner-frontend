import TopNavBar from "../../../components/navbars/top-nav-bar/Top-nav-bar.js";
import ListItem from "../../../components/lists/list-item/List-item.js";
import React, {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {ReactComponent as Plus} from "../../../scss/icons/plus.svg";
import {useParams} from "react-router-dom";
import {AutoScheduleController} from "../../../controllers/AutoScheduleController.js";
import Button from "../../../components/buttons/common-buttons/Button.js";
import {ReactComponent as Folder} from "../../../scss/icons/folder.svg";
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
        }else {
            setSnackBarMsg(text)
            setSnackBarShow(true)
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
    async function savePlan( start,end,taskId ) {

        const resp = await PlanController.add([taskId], start, end)
        if (resp.status === 'success') {
            return resp.data[0];
        }else{
            handleDialog('dialog',resp.error)
        }
    }
    async function saveSchedule(pId) {

        const resp = await AutoScheduleController.add(pId, activeWeekdays);
        if (resp.status !== "success") {
            handleDialog( 'Something wrong happened!')
        }else{
            handleDialog( 'snackBar','Saved!' )
            goBack()
        }
    }
    function checkInputs(){
        if (activeWeekdays.indexOf('1') === -1) {
            handleDialog('dialog','Please select the days you want the auto schedule to repeat.')
            return false;
        }
        if( taskSubject.length === 0 ){
            handleDialog('dialog','Please fill the input related to subject of the task')
            return false;
        }
    }

    async function handleSave() {

        if(checkInputs === false)return;
        let t;
        const start = startTimeValue === '0000' ? -1 : startTimeValue;
        const end = endTimeValue === '0000' ? -1 : endTimeValue;
        const task =allTasks.find(x=>x.subject === taskSubject);

        if( task.length === 0 ){
            const result = await TaskController.add(taskSubject, '');
            if(result.status === "success"){
                t= result.data[0];
            } else {
                handleDialog('dialog','Something went wrong!');
            }
        }else{
            t = task;
        }

        if (schedule.current !== undefined) {
            if( activeWeekdays === schedule.weekdays && start === schedule.start && end === schedule.end ){
                await saveSchedule(schedule.plan_id);

            }
        } else {
            const pId = await savePlan(start, end, t.Id);
            if(typeof pId === "number") await saveSchedule(pId);
            else handleDialog('dialog','Something went wrong!')
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
                        setTaskSubject(s.subject)
                        setStartTimeValue(s.start)
                        setEndTimeValue(s.end)
                        adjustTimingText(s.start,s.end)
                        setActiveWeekdays(s.weekdays)
                    }
                })

            }else if( tId ){
                TaskController.get(tId).then(x=>{
                    if (x.status === 'success') {
                        const s = x.data[0];
                        schedule.current = s;
                        setTaskSubject(s.subject)
                    }
                })
            }else {

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
                              divider={false}
                              trailing = {' '}
                    />
                    <WeekdayChips activeDays={ activeWeekdays }
                                  setActiveDays={ setActiveWeekdays }
                    />

                </div>
                <div className='save-button'>
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
