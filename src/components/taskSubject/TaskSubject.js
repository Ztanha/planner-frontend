import './taskSubject.scss'
import ListItem from "../lists/list-item/List-item.js";
import {ReactComponent as Folder} from "../../scss/icons/folder.svg";
import React, {useEffect, useRef, useState} from "react";
import TextField from "../text-field/TextField.js";
import AutoFiller from "../autofiller/Autofiller.js";

function TaskSubject(props) {
    const [ editMode,setEditMode ]=useState(false);
    const [ editStatus,setEditStatus ]=useState('');
    const [ suggestions,setSuggestions ]=useState([])

    console.log(suggestions)
    function checkValidation(value){
        setSuggestions( props.allTasks.filter(x=>x.subject.includes(value)) );
        props.setTask(value);
        setEditStatus('done')
    }
    return (<>
        {
            editMode === true
            ?<>
                <TextField leading={ <Folder/> }
                           placeholder={ props.task }
                           label={'Task name'}
                           setValue={ checkValidation }
                           status={editStatus}
                />
                <AutoFiller suggestions={ suggestions }/>

            </>
            :
                <ListItem leading = { <Folder/> }
                          overline = { 'Task name' }
                          trailing = { ' ' }
                          headline = { props.task }
                          divider={ true }
                          click={ ()=>setEditMode(true)}
                />
        }
    </>)
}
export {TaskSubject}