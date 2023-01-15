import './chips.scss';
import {ReactComponent as Tik} from "../../scss/icons/tik.svg";
import {useState} from "react";
import {useTheme} from "../../ThemeContext.js";

//Types : assist , filter , input , suggestion
function Chip(props){

    const [ theme ]= useTheme();
    const [ state,setState ]=useState('default')
    const styles = {
        filter:{
            default:{
                backgroundColor: theme.surface,
                color:theme.onSurfaceVariant,
                // border:`1px solid red`
                border:`1px solid ${ theme.outline }`
            },
            selected:{
                backgroundColor:theme.secondaryContainer,
            },
            hovered:{
              backgroundColor:theme.primary,
            },

        }
    }
    const style = {...styles[props.type]['default'],...styles[ props.type ][ props.state ]}
    return(
        <div className='chip-component'>
            <div className ='background-effects'>
                <div className={props.type}
                     style={ style }
                     onClick={ props.click }
                     onMouseEnter={ ()=>setState('hovered') }
                     onMouseLeave={ ()=>setState('default') }
                     // onMouseDown={ ()=>setState('selected') }
                    >
                    { props.selected && props.type === 'filter'
                        ? <div className='icon'><Tik /></div>
                        : ''
                    }
                    <div className='label'>
                        { props.label }
                    </div>
                </div>
            </div>
        </div>
    )
}

export {Chip}