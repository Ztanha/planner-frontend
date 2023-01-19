import './taskSubject.scss'
import ListItem from "../lists/list-item/List-item.js";
import {ReactComponent as Folder} from "../../scss/icons/folder.svg";
import React, {useEffect, useRef, useState} from "react";
import TextField from "../text-field/TextField.js";

function TaskSubject(props) {
    const [ editMode,setEditMode ]=useState(false);
    const [ editStatus,setEditStatus ]=useState('');

    function checkValidation(value){
        props.setValue(value);
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