import './taskSubject.scss'
import ListItem from "../lists/list-item/List-item.js";
import {ReactComponent as Folder} from "../../scss/icons/folder.svg";
import React, {useState} from "react";
import TextField from "../text-field/TextField.js";

function TaskSubject(props) {
    const [ editMode,setEditMode ]=useState(false)
    return (<>
        {
            editMode === true
            ?
                <TextField />
            :
                <ListItem leading = {<Folder/>}
                          overline = { 'Task name' }
                          trailing = { ' ' }
                          headline = { props.task }
                          divider={ true }
                    // click={ ()=>setNameEditMode(true)}
                />
        }
    </>)
}
export {TaskSubject}