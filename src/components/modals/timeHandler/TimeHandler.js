import TimePicker from "react-material-time-picker";
import React, {useEffect, useRef, useState} from "react";

function TimeHandler(props){
    const [ secondClockDisplay,setSecondClockDisplay ]=useState(false)
    const [ firstClockDisplay,setFirstClockDisplay ]=useState(true)
    const tempStartValue = useRef();
    const tempEndValue = useRef();

    function handleSwitch(){
        setFirstClockDisplay(!firstClockDisplay);
        setSecondClockDisplay(!secondClockDisplay);
    }
    useEffect(()=>{
        if(props.modalShow === true){
            setFirstClockDisplay(true);
            setSecondClockDisplay(false);
        }else{
            setFirstClockDisplay(false);
            setSecondClockDisplay(false);
        }
    },[props.modalShow])

    return(<>
        { props.modalShow
            ?
            <>
                <TimePicker onChange={ value=>{tempStartValue.current = value} }
                            show={ firstClockDisplay }
                            theme={'light'}
                            defaultValue={ props.firstClockValue }
                            hide={ ()=>props.setModalShow(false) }
                            top={'0'}
                            buttons={[
                                {
                                    label:'Cancel',
                                    onClick:()=>props.setModalShow(false)
                                },
                                {
                                    label:'Next',
                                    onClick:handleSwitch
                                }
                            ]}
                />
                <TimePicker onChange={ value=>{tempEndValue.current = value} }
                            show={ secondClockDisplay }
                            theme={'light'}
                            top={'0'}
                            defaultValue={ props.secondClockValue }
                            hide={ ()=>props.setModalShow(false) }
                            buttons={[
                                {
                                    label:'Back',
                                    onClick:handleSwitch
                                },
                                {
                                    label:'Save',
                                    onClick:()=>props.onChange(tempStartValue.current,tempEndValue.current)
                                }
                            ]}
                />
            </>
            :''
        }
    </>)
}
export {TimeHandler}