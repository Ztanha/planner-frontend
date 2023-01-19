import './textField.scss';
import {ReactComponent as Unknown} from "../../scss/icons/cancel.svg";
import {ReactComponent as Magnifier} from "../../scss/icons/magnifier.svg";
import {ReactComponent as Notice} from "../../scss/icons/notice.svg";
import {ReactComponent as Done} from "../../scss/icons/done.svg";
import {useTheme} from "../../ThemeContext.js";
import React, {useEffect, useRef, useState} from "react";

export default function TextField(props) {
    const [theme]=useTheme();
    const [ input,setInput ]=useState('');
    const inp = useRef();

    function handleValue(e) {
        props.setValue(e.target.value.trim())
    }

    console.log('va:',props.value)
    useEffect(()=>{
        setInput(<input  defaultValue={props.value}
                         placeholder={props.placeholder || ''}
                         onChange={ handleValue }
        />)
    },[props.value])

    return(<div className='text-field-container'>
        <div className='first-row'
             style={{
                 backgroundColor:theme.surfaceVariant
             }}
        >
            { props.leading === true
                ? <div className='leading'>
                    <Magnifier />
            </div>
                : props.leading === false
                    ? ''
                    : <div className='leading'>
                        { props.leading }
                    </div>
            }
            <div className='middle-container'>
                <div className='label-container'>
                    {props.label}
                </div>
                {input}

            </div>
            <div className='trailing'>
                {props.status === 'error'
                    ? <Notice/>
                    : props.status === 'done'
                        ? <Done/>
                        : <Unknown onClick={()=>props.setValue('')}/>
                }
            </div>
        </div>
        <div className='s-text-container'>
            {props.supportingText}
        </div>
    </div>)

}