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
import {ReactComponent as Folder} from "../../../scss/icons/folder.svg";
import './automation.scss'
import BottomNavBar from "../../../components/navbars/bottom-nav-bar/Bottom-nav-bar.js";
import TaskController from "../../../controllers/TasksController.js";
import {TimeHandler} from "../../../components/modals/timeHandler/TimeHandler.js";
import {Time} from "../../../utilities/time.js";
import {WeekdayChips} from "../../../components/weekdayChips/WeekdayChips.js";
import Dialog from "../../../components/dialog/Dialog.js";
import PlanController from "../../../controllers/PlanController.js";
import SnackBar from "../../../components/snack-bar/Snack-bar.js";
import {TaskSubject} from "../../../components/taskSubject/TaskSubject.js";

export default function Automation(){

    const params = useParams();
    const [ timingText,setTimingText ] = useState('Ex. from 9 am to 10 am');
    const [ startTimeValue,setStartTimeValue ] = useState('0000');
    const [ endTimeValue,setEndTimeValue ] = useState('0000');
    const [ activeWeekdays,setActiveWeekdays ] = useState('0000000');
    const [ dialogMsg,setDialogMsg ] = useState('');
    const [ snackBarMsg,setSnackBarMsg ] = useState('');
    const schedule = useRef();
    const task = useRef();
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
    async function handleDelete() {
        await AutoScheduleController.delete(schedule.current.id);
        //todo are you sure dialog
    }

    function handleTimeChange(start,end){

        console.log('start:',start)
        console.log('end:',end)
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

        if(pId){
            return await PlanController.update(pId, start, end, taskId)
        }else{
            return await PlanController.add([taskId], start, end)
        }
    }
    async function saveSchedule(pId,sId='') {
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
        const taskId = await getTask();

        if ( schedule.current !== undefined ) {
            let pId;
            if( start === schedule.current.start && end === schedule.current.end && schedule.current.subject === taskSubject ){
                pId = schedule.current.plan_id;
            }else{
                const planResult =  await savePlan(start, end, taskId, schedule.current.plan_id);
                if(planResult.status === 'success') {
                    pId = planResult.data
                } else {
                    handleDialog('snackBar',planResult.error)
                    return;
                }
            }

            result = await saveSchedule(pId,schedule.current.id)

        } else {
            const pResult = await savePlan(start, end, taskId);
            if (pResult.status === 'success'){
                result = await saveSchedule( pResult.data )
            } else {
                handleDialog('snackBar',pResult.error)
            }
        }
        if (result.status === "error") {
            handleDialog( 'dialog','Something wrong happened!')
        }else{
            handleDialog( 'snackBar','Saved!' )
        }
    }

    useEffect(()=>{

        if( pageFetch.current === false ){
            let tasks;
            TaskController.getAll().then(resp=>{
                if(resp.status === "success") {
                    tasks = resp.data;
                    setAllTasks(tasks);
                }
            })
            if( sId ){
                AutoScheduleController.get([sId]).then(x => {
                    if (x.status === 'success') {
                        const s = x.data[0];
                        const sTime = Time.decodeToString(s.start);
                        const eTime = Time.decodeToString(s.end);
                        schedule.current = s;
                        setTaskSubject(s.subject)
                        setStartTimeValue( sTime )
                        setEndTimeValue( eTime )
                        adjustTimingText( sTime,eTime )
                        setActiveWeekdays(s.weekdays)
                    }
                })
            }else if( tId ){
                TaskController.get(tId).then(x=>{
                    if(x.status === 'success') {
                        // setTaskSubject(x.data.subject);
                        task.current = x.data;
                        console.log('task:',x.data);
                    }else{

                    }
                })
                // const task = tasks.find(x=>x.id === Number(tId));
                // if( typeof task !== 'undefined')
                //     setTaskSubject( task.subject )
            }
            pageFetch.current = true;
        }
    },[pageFetch,setTaskSubject,sId,tId,setActiveWeekdays,schedule,setTaskSubject,setStartTimeValue,setEndTimeValue])

    // useEffect(()=>{
    //     if(allTasks.length >0 && tId ) {
    //
    //     }
    // },[tId,allTasks])
    return (
        <motion.div initial={{ width: 0 }}
                        animate={{ width:'100%' }}
                        exit={{ x: window.innerWidth,transition:{ duration: 0.1} }}
                        className='page'
        >
            <TopNavBar headline={ sId ? 'Automation' :'New Automation' }>
                <ListItem headline={'something'}
                  leading={ <Plus/> }
                />
            </TopNavBar>
            <div className='automation-page'>
                { task.current
                    ? <ListItem overline = {'Task name'}
                                supportingText = {task.current?.subject}
                                divider={true}
                                leading={<Folder/>}
                                trailing = {' '}

                    />
                    : taskSubject
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

                <div className={ schedule.current ? 'double main-btns': 'main-btns'}>
                    { schedule.current
                        ?
                        <Button type = { 'outline' }
                                click = { handleDelete }
                                style={{minWidth:'7em'}}
                        >
                            Delete
                        </Button>
                        :
                        ''
                    }
                    <Button type = { 'filled' }
                            click = { handleSave }
                            style={ schedule.current ? {minWidth:'7em'} : {minWidth:'100%'}}
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
