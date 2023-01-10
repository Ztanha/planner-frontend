import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import TaskController from "../../controllers/TasksController.js";
import redirect, {goBack} from "../../utilities/redirect.js";
import TopNavBar from "../../components/navbars/top-nav-bar/Top-nav-bar.js";
import ListItem from "../../components/lists/list-item/List-item.js";
import './task.scss'
import BottomNavBar from "../../components/navbars/bottom-nav-bar/Bottom-nav-bar.js";
import {motion} from "framer-motion";
import {ReactComponent as Pencil } from "../../scss/icons/pencil.svg";
import {ReactComponent as Plus } from "../../scss/icons/plus.svg";
import {ReactComponent as Trash } from "../../scss/icons/trash.svg";
import Dialog from "../../components/dialog/Dialog.js";
import TextField from "../../components/text-field/TextField.js";
import Button from "../../components/buttons/common-buttons/Button.js";
import SnackBar from "../../components/snack-bar/Snack-bar.js";
import {ReactComponent as NotFound} from "../../scss/shapes/empty.svg";

export default function Task(){
    let { tId } = useParams();
    const [ task,setTask ] = useState();
    const fetchRan = useRef(false);
    const [ tasks,setTasks ] = useState([]);
    const subjectRef = useRef('');
    const [ inpValue,setInpValue ] =useState();
    const [ editModalShow,setEditModalShow ] = useState(false);
    const [ noticeModalShow,setNoticeModalShow ] = useState(false);
    const [ msgModal, setMsgModal ] = useState(false);
    const [ msg,setMsg ] = useState('');
    const [ status,setStatus ] = useState('');
    const [ msgModalContent,setMsgModalContent ] = useState('');

    function getTasks() {
        TaskController.getAll().then(resp=>{
            if( resp.status === 'success') {
                setTasks(resp.data);
            }
        })
    }
    function handleEdit() {
        if(tasks.length === 0) {
            getTasks();
        }
        setEditModalShow(true);
    }

    function handleDelete() {

        setNoticeModalShow(false);
        TaskController.delete(tId).then(resp=>{
            if(resp.status === 'success') {
                setMsgModalContent('Task deleted successfully!')
                setMsgModal(true);
            }
        })
    }

    async function handleSaveEdit() {
        try {
            const similar = tasks.find(x => x.subject === inpValue && x.id !== Number(tId))
            if (typeof similar !== 'undefined') {
                setMsg('There already is a task with this name!')
                setStatus('error')
            }
            else {
                if ( inpValue !== subjectRef.current) {
                    const resp = await TaskController.update(tId, inpValue);
                    if (resp.status === 'success') {

                        setStatus('done');
                        subjectRef.current = inpValue;
                        setEditModalShow(false);

                    } else {
                        setMsg(resp.error)
                    }
                }
            }
        }catch (e) {
            setMsgModalContent(e)
            setMsgModal(true);
            //todo test
        }
    }

    useEffect(()=>{

        if(tId.length >0 && fetchRan.current === false){
            TaskController.get(tId).then(resp=>{
                if(resp.status === 'success'){
                    setTask(resp.data);
                    subjectRef.current = resp.data.subject;
                } else{
                    setTask({});
                }
            })
            fetchRan.current = true;
        }

    },[tId,fetchRan.current])

    const content = (<>
        <ListItem leading = { <Pencil/> }
                  headline = {'Edit name'}
                  divider = { <true/> }
                  effects={true}
                  click={ handleEdit }
        />

        <ListItem leading={ <Plus/> }
                  headline={ 'Add a schedule' }
                  divider = { true }
                  effects={true}
                  click={ ()=>redirect('/schedule/task/'+tId) }
        />

        <ListItem leading={ <Plus/> }
                  headline={ 'Add automations' }
                  divider = { true }
                  effects={true}
                  click = { ()=>redirect('/automation/task/'+tId) }
        />

        <ListItem leading={ <Trash/> }
                  headline={ 'Delete' }
                  divider = { true }
                  effects = { true }
                  click = { ()=>setNoticeModalShow(true) }
        />
    </>)
    return (<motion.div initial={{ width: 0 }}
                        animate={{ width:'100%' }}
                        exit={{ x: window.innerWidth,transition:{ duration: 0.1 } }}
                        className='page'
    >
        <TopNavBar headline={ subjectRef.current || '' }>
            <ListItem headline={ 'Create a new task' }
                      leading={ <Plus/> }
            />
        </TopNavBar>
        <div className='task-page'>
            { (typeof task !== "undefined") && (Object.values(task).length>0)
                ? content
                : <div className='shape-container'>
                    <NotFound />
                    Task Not Found!
                </div>
            }
        </div>
        <Dialog show = { editModalShow }
                setShow = { setEditModalShow }
                title = {'Edit task name?'}
                buttons={
                    <><Button type = {'text'} click={ ()=>setEditModalShow(false) }>
                        Cancel
                    </Button>
                    <Button type = {'text'} click={ handleSaveEdit } >
                        Save
                    </Button></>
                }>
                <TextField label = { 'Subject' }
                           supportingText = {msg}
                           status = { status }
                           leading = { true }
                           placeholder = { subjectRef.current }
                           setValue = { setInpValue }
                />
        </Dialog>
        <Dialog show = { noticeModalShow }
                setShow = { setNoticeModalShow }
                title = { 'Delete Task?' }
                buttons = {
                    <><Button type = {'text'} click={ ()=> setNoticeModalShow(false)}>
                        Cancel
                    </Button>
                    <Button type = {'text'} click={ handleDelete } >
                        Delete
                    </Button></>
                }>
            <p>You are about deleting a task, schedules
                related to this task also will be deleted.</p>
        </Dialog>
        <SnackBar show = { msgModal }
                  setShow = { setMsgModal }
                  headline = { msgModalContent }
                  closeAffordance = {true}
                  onAfterShow = { ()=>goBack() }
        />
        <BottomNavBar />
    </motion.div>)
}
//todo suppose somewhere to show description of tasks
//todo menu links