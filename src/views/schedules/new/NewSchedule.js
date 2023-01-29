// import NavigationBar from "../../../components/navigation-bar/Footer.js";
// import TaskInput from "../../../components/inputs/TaskInput.js";
import {useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {Time} from "../../../utilities/time.js";
import PlanController from "../../../controllers/PlanController.js";
import './newSchedule.scss'
import ScheduleController from "../../../controllers/ScheduleController.js";
import dayTimestamp from "../../../utilities/dayTimestamp.js";
import TaskController from "../../../controllers/TasksController.js";
import {motion} from "framer-motion";
import ListItem from "../../../components/lists/list-item/List-item.js";
import TopNavBar from "../../../components/navbars/top-nav-bar/Top-nav-bar.js";
import {ReactComponent as Plus} from "../../../scss/icons/plus.svg";
import {ReactComponent as Clock} from "../../../scss/icons/clock.svg";
import {ReactComponent as Folder} from "../../../scss/icons/folder.svg";
import {ReactComponent as Calendar} from "../../../scss/icons/today-tasks.svg";
import BottomNavBar from "../../../components/navbars/bottom-nav-bar/Bottom-nav-bar.js";
import {TimeHandler} from "../../../components/modals/timeHandler/TimeHandler.js";
import Button from "../../../components/buttons/common-buttons/Button.js";
import {useTheme} from "../../../ThemeContext.js";
import DatePicker from "react-date-picker-material";
import {timeDurationToText, timestampToDay} from "../../../utilities/utilities.js";
import Dialog from "../../../components/dialog/Dialog.js";
import SnackBar from "../../../components/snack-bar/Snack-bar.js";


export default function NewSchedule() {
    let {tId} = useParams() || '';
    // const [colors]=useTheme();
    const today = new Date().getTime();
    const [ date,setDate ] = useState(today)
    const [task,setTask] = useState();
    const [ timingText,setTimingText ] = useState('Ex. from 9 am to 10 am');
    const [ startTimeValue,setStartTimeValue ] = useState('');
    const [ endTimeValue,setEndTimeValue ] = useState('');
    const [ timeHandlerShow,setTimeHandlerShow ]= useState(false);
    const [ dateHandlerShow,setDateHandlerShow ]= useState(false);
    const [ dialogHandlerShow,setDialogHandlerShow ]= useState(false);
    const [ dialog,setDialog ]= useState('');
    const [ snackBar,setSnackBar ] =useState({});

    const fetchRan =useRef(false);
    function loadDialog( msg,title ) {
        setDialog({
            msg : msg,
            title : title
        });
        setDialogHandlerShow(true);
    }
    function onDateChange() {
        if( date >= today) {
            setDateHandlerShow(false);
        }else{
            loadDialog('Wrong date value!','Oops')
        }
    }
    function handleTimeChange(sValue,eValue) {

        let text;
        setStartTimeValue( sValue );
        setEndTimeValue( eValue );
         if( sValue.length === 4 && eValue.length === 4) {

             text =`From ${ sValue.slice(0,2) }:${ sValue.slice(2) } to ${ eValue.slice(0,2) }:${ eValue.slice(2) }`
         }else if( sValue.length === 4 ) {
             text = `At ${ sValue.slice(0,2) }:${ sValue.slice(2) }`
         }
         if(text)setTimingText(text)
         setTimeHandlerShow(false)
    }
    function handleSave() {
        let start = Time.encode( startTimeValue );
        let end = Time.encode( endTimeValue );

        if( date.length === 0 ){
            loadDialog('Date input must be filled!','Oops!')
            return;
        }
        if( tId && startTimeValue.length === 100000) {

            PlanController.add([tId],start,end).then(x=>{

                if(x.status === 'success') {
                    const pId = x.data[0];
                    ScheduleController.add([pId],dayTimestamp.inpFormatToTimeStamp(date))
                        .then(resp=>{
                            if(resp.status === 'success' )alert('done')
                        })
                }
            })
        }else{
            setSnackBar({
                text: 'Something went wrong!',
                show: true
            })
        }
    }
    useEffect(()=>{
        if(fetchRan.current === false) {
            if(tId) {
                TaskController.get(tId).then(resp=>{
                    if(resp.status === 'success'){
                        setTask(resp.data)
                    }
                })
            }else{

            }
            fetchRan.current = true;
        }

    },[tId,setTask,fetchRan])

    return(
        <motion.div initial={{ width: 0 }}
                    animate={{ width:'100%' }}
                    exit={{ x: window.innerWidth,transition:{ duration: 0.1} }}
                    className='page'
        >
            <TopNavBar headline={ task ? (task?.subject || '') :'' }>
                <ListItem headline={'something'}
                          leading={ <Plus/> }
                />
            </TopNavBar>
            <div className='page-newSchedule'>
                { task
                    ? <ListItem overline = {'Task name'}
                                supportingText = {task.subject}
                                divider= {true}
                                leading= {<Folder/>}
                                trailing = {' '}
                    />
                    : ''
                }
                <ListItem leading = { <Clock/> }
                          overline = { 'Timing' }
                          supportingText = { timingText }
                          divider={ true }
                          click={ ()=>setTimeHandlerShow(true) }
                />
                <ListItem leading = { <Calendar/> }
                          overline = {'Date'}
                          divider= { true }
                          supportingText = { timestampToDay(date) }
                          click={ ()=>setDateHandlerShow(true) }
                />
                <DatePicker show={ dateHandlerShow }
                            hide={ setDateHandlerShow }
                            date={ date }
                            style={{ top:'10px', fontFamily:'Roboto' ,zIndex:1003 }}
                            setDate={ setDate }
                            selectDate={ onDateChange }
                />
                <div className='s-btns'>
                    <Button type = { 'filled' }
                            click = { handleSave }
                            style={{width:'100%'}}
                    >
                        Save
                    </Button>
                </div>

                <TimeHandler modalShow={ timeHandlerShow }
                             setModalShow={ setTimeHandlerShow }
                             firstClockValue={ startTimeValue }
                             secondClockValue={ endTimeValue }
                             onChange={ handleTimeChange }
                />
                <Dialog show={ dialogHandlerShow }
                        hide={ setDialogHandlerShow }
                        title = { dialog.title }
                        buttons = { <Button type={'filled'}
                                            click={ ()=>setDialogHandlerShow(false)
                                    }>
                            OK
                        </Button>}
                >
                    { dialog.msg }
                </Dialog>
                <SnackBar supportingText={ snackBar.text }
                          show = { snackBar.show }
                />
            </div>
            <BottomNavBar/>

        </motion.div>
    )
}