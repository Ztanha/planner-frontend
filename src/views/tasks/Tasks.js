import {useEffect, useRef, useState} from "react";
import TaskController from "../../controllers/TasksController.js";
import './tasks.scss'
import TopNavBar from "../../components/navbars/top-nav-bar/Top-nav-bar.js";
import ListItem from "../../components/lists/list-item/List-item.js";
import BottomNavBar from "../../components/navbars/bottom-nav-bar/Bottom-nav-bar.js";
import { motion } from "framer-motion";
import {ReactComponent as Plus} from "../../scss/icons/plus.svg";
import FAB from "../../components/fabs/FAB.js";
import Dialog from "../../components/dialog/Dialog.js";
import TextField from "../../components/text-field/TextField.js";
import Button from "../../components/buttons/common-buttons/Button.js";
import SnackBar from "../../components/snack-bar/Snack-bar.js";
import {useTheme} from "../../ThemeContext.js";
import {useNavigate} from "react-router-dom";
import {ResourceLoader} from "../../components/ResourceLoader.js";
import {TaskListItems} from "../../components/TaskListItems.js";
import {withNewTask} from "../../components/withNewTask.js";
import {withSaveButton} from "../../components/hocs/withSaveButton.js";
import {withModal} from "../../components/hocs/withModal.js";


export default function tasks(){
    const [theme] = useTheme();
    const fetchRan = useRef(false);
    const [ newTaskModal,setNewTaskModal ] = useState(false);
    const [ savingStatus, setSavingStatus ] = useState('');
    const [ newTaskValue , setNewTaskValue ] = useState('');
    const [ msg , setMsg ] = useState('Ex. Yoga');
    const [ snackBarMsg , setSnackBarMsg ] = useState('');
    const [ showSnackBar,setShowSnackBar ] = useState(false);

    const NewTaskInput =  ()=><TextField leading = { false }
                                    label = { 'subject' }
                                    supportingText = { msg }
                                    trailing = { savingStatus }
                                    value = { newTaskValue }
                                    setValue = { setNewTaskValue }
                            />
    async function handleSaveNewTask(tasks){

        const similar = tasks.find( x => x.subject === newTaskValue.trim() )
        if ( typeof similar !== 'undefined' ) {
            setMsg('There already is a task with this name!')
            setSavingStatus('error')
        }else {
            const resp = await TaskController.add(newTaskValue,'');
            if (resp.status === 'success') {

                setSavingStatus('done');
                setSnackBarMsg('Saved!');
                setShowSnackBar (true);
                setNewTaskModal(false);
                fetchRan.current = false;

            } else {
                setMsg(resp.error)
            }
        }
    }
    const ModalWrapped = withModal( withSaveButton( NewTaskInput ,tasks => handleSaveNewTask(tasks) ),newTaskModal)

    return (<motion.div initial={{ width: 0 }}
                        animate={{ width:'100%' }}
                        exit={{ x: window.innerWidth,transition:{ duration: 0.1} }}
                        className='page'
    >
        <TopNavBar headline={'Tasks'}>
            <ListItem headline={'Create a new task'}
                      leading={<Plus/>}
            />
        </TopNavBar>
        <div className='tasks-page'>
            <ResourceLoader resourceUrl={'tasks/'}
                            resourceName={'tasks'}
            >
                <TaskListItems />
                <ModalWrapped />
            </ResourceLoader>
            <FAB icon={
                <Plus style={{fill: `${theme.primary}`}}/>
                }
                 click={ ()=>{ setNewTaskModal(true) }}
            />
        </div>
        {/*<Dialog show = { newTaskModal }*/}
        {/*        setShow = { setNewTaskModal }*/}
        {/*        title = { 'Add a new task'}*/}
        {/*        buttons = {<>*/}
        {/*            <Button type = { 'text' }*/}
        {/*                    click={ ()=>setNewTaskModal(false)}*/}
        {/*            >*/}
        {/*                Cancel*/}
        {/*            </Button>*/}
        {/*            <Button type = { 'text' }*/}
        {/*                    click = { handleSaveNewTask }*/}
        {/*            >*/}
        {/*                Save*/}
        {/*            </Button>*/}
        {/*        </>}*/}
        {/*>*/}
        {/*    <TextField leading = { false }*/}
        {/*            label = { 'subject' }*/}
        {/*            supportingText = { msg }*/}
        {/*            trailing = { savingStatus }*/}
        {/*            value = { newTaskValue }*/}
        {/*            setValue = { setNewTaskValue }*/}
        {/*    />*/}
        {/*</Dialog>*/}
        <SnackBar show={ showSnackBar }
                  setShow= { setShowSnackBar }
                  headline = { snackBarMsg }
                  closeAffordance = { true }
        />
        <BottomNavBar/>
    </motion.div>)
}
