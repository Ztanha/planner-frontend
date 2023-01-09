import './button.scss'

import './button.scss'
import { useRef, useState} from "react";
import {hexToRGB} from '../../../utilities/colors.js'
import {useTheme} from "../../../ThemeContext.js";

export default function Button(props) {
    const [ colors ] =useTheme();
    const [ state, setState ] = useState('default');
    let button = useRef();
    function formatColor(color) {
        if(typeof color === "string") {
            if(color.startsWith('#')) return hexToRGB(color)
            else return color;
        }
    }

    const styles = {
        outline : {
            default:{

                backgroundColor:'transparent'
            },
            hovered:{

                backgroundColor:`rgba(${ formatColor(colors.primary) }, .08)` ,
            },
            activated:{

                backgroundColor:`rgba(${ formatColor(colors.primary) }, .12)` ,
            }
        },
        filled : {
            default: {
                color : colors.onPrimary,
                backgroundColor: colors.primary,
                border: 'none',
            },
            hovered:{

                boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15),0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
            },
            activated:{

                boxShadow: 'none'
            }
        },
        text : {
            default:{
                color : colors.primary,
                backgroundColor: 'transparent',
            },
            hovered:{

                backgroundColor:`rgba(${ formatColor(colors.primary) }, .08)` ,
            },
            activated: {

                backgroundColor:`rgba(${ formatColor(colors.primary) }, .12)` ,
            }
        }
    }

    let buttonStyle = {...styles[ props.type ]['default'],...styles[props.type][state]};

    const handleClick =(e)=>{
        e.stopPropagation();
        props.click();
    }
    return <div className='buttons'>
        <button ref={button} className = { typeof props.size !== 'undefined'
            ? props.type+' btn '+props.size
            : props.type+' btn'
        }
                onClick = { handleClick }
                style={ buttonStyle }
                onMouseEnter={()=>setState('hovered')}
                onMouseLeave={()=>setState('default')}
                onMouseDown={()=>setState('activated')}
        >
            { props.children }
        </button>
        <div></div>
    </div>
}



