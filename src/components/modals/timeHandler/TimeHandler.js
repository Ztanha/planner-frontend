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
    function singleTimeSave() {
        props.onChange(tempStartValue.current,'')
        setFirstClockDisplay(false)
    }
    function handleSave(){
        props.onChange(tempStartValue.current,tempEndValue.current)
        setSecondClockDisplay(false)
    }

    useEffect(()=>{

        console.log(props.modalShow)
        setFirstClockDisplay(true); // to reset the order of the clocks
        setSecondClockDisplay(false);

    },[ props.modalShow ])

    return(<>
        { props.modalShow
            ?
            <>
                <TimePicker onChange={ value=>{tempStartValue.current = value} }
                            show={ firstClockDisplay }
                            clockWidth={'200'}
                            width={'300'}
                            theme={'light'}
                            defaultValue={ props.firstClockValue }
                            hide={ ()=>props.setModalShow(false) }
                            style={{ fontFamily:'Roboto',top:'10px' }}
                            buttons={[
                                {
                                    label:'Done',
                                    onClick:singleTimeSave
                                },
                                {
                                    label:'Next',
                                    onClick:handleSwitch
                                }
                            ]}
                />
                <TimePicker onChange={ value=>{ tempEndValue.current = value } }
                            show={ secondClockDisplay }
                            theme={'light'}
                            clockWidth={'200'}
                            width={'300'}
                            style={{ fontFamily:'Roboto',top:'10px' }}
                            defaultValue={ props.secondClockValue }
                            hide={ ()=>props.setModalShow(false) }
                            buttons={[
                                {
                                    label:'Back',
                                    onClick:handleSwitch
                                },
                                {
                                    label:'Save',
                                    onClick:handleSave
                                }
                            ]}
                />
            </>
            :''
        }
    </>)
}
export {TimeHandler}