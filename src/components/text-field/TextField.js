import './textField.scss';
import {ReactComponent as Unknown} from "../../scss/icons/cancel.svg";
import {ReactComponent as Magnifier} from "../../scss/icons/magnifier.svg";
import {ReactComponent as Notice} from "../../scss/icons/notice.svg";
import {ReactComponent as Done} from "../../scss/icons/done.svg";
import {useTheme} from "../../ThemeContext.js";
import {useRef} from "react";

export default function TextField(props) {
    const [theme]=useTheme()
    const inp = useRef();
    function handleValue(e) {
        props.setValue(e.target.value)
    }

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
                <input  ref={inp}
                        placeholder={props.placeholder || ''}
                        onChange={ handleValue }
                />
            </div>
            <div className='trailing'>
                {props.status === 'error'
                    ? <Notice/>
                    : props.status === 'done'
                        ? <Done/>
                        : <Unknown onClick={()=>inp.current.value = ''}/>
                }
            </div>
        </div>
        <div className='s-text-container'>
            {props.supportingText}
        </div>
    </div>)

}