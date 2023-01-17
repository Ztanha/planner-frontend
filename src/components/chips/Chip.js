import './chips.scss';
import {ReactComponent as Tik} from "../../scss/icons/tik.svg";
import {useState} from "react";
import {useTheme} from "../../ThemeContext.js";
import {formatColor} from "../../utilities/colors.js";

//Types : assist , filter , input , suggestion
function Chip(props){

    const [ theme ]= useTheme();
    const [ chipState,setChipState ]=useState('default')
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
                backgroundColor:`rgba(${ formatColor( theme.primary) }, .08)`
            },
        }
    }
    let style = styles.filter.default;
    style = {...style, ...styles[ props.type ][ chipState ]}
    return(
        <div className='chip-component'>
            <div className ='background-effects'>
                <div className={props.type}
                     style={ style }
                     onClick={ props.click }
                     onMouseEnter={ ()=>setChipState('hovered') }
                     onMouseLeave={ ()=>setChipState('default') }
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