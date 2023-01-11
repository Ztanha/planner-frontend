import {ReactComponent as RightIcon} from "../../../scss/icons/right.svg";
import './list-item.scss';
import {capitalizeFirstChar} from "../../../utilities/utilities.js";
import {useTheme} from "../../../ThemeContext.js";
import {useState} from "react";
import {formatColor} from "../../../utilities/colors.js";

export default function ListItem(props) {
    const [ theme ]= useTheme();
    const [ state,setState ]= useState('default');
    let classes = typeof props.effects !== 'undefined' ? ' effects list-item-container ' : 'list-item-container';
    // classes = typeof props.click === "undefined" ? classes+' no-click-event': classes;

    const styles = {
        default:{
            backgroundColor:'transparent',
        },
        hovered:{
            backgroundColor:`rgba(${ formatColor( theme.onSurfaceVariant) }, .08)` ,
        },
        activated:{
            backgroundColor:`rgba(${ formatColor(theme.onSurfaceVariant) }, .12)` ,
        }
    }
    const dividers = {
        full:{
            borderBottom:`1px solid ${theme.outline}`,
            margin: '0 0 0 1rem ',
        },
        inset:{
            borderBottom:`1px solid ${theme.outline}`,
            margin: '0 0 0 1rem ',
            width:'80%'
        },
        middleInset:{
            borderBottom:`1px solid ${theme.outline}`,
            width:'85%',
            margin: '0 auto',
        },
        withSubhead:{
            borderTop:`1px solid ${theme.outline}`,
            innerText: `${props.subhead}` || ''
        },
    }
    const itemStyle = { ...styles[state] }
    const borderStyle = {...(props.divider ? dividers[props.borderType || 'full'] : {})}

    return (<>
        <div className={ classes }
             onClick={ props.click }
             onMouseEnter={ ()=>setState('hovered') }
             onMouseLeave={ ()=>setState('default') }
             onMouseDown={ ()=>setState('activated') }
        >
            { props.effects
                ?
                    <div className={'bg-effects'}
                         style = {itemStyle}
                    />
                : ''
            }
            <div className='content' style={{zIndex:'3'}}>

                <div className='leading'>
                    { props.leading }
                </div>
                <div className='texts'>
                    { props.overline
                        ? <div className='overline'
                               style={{ color:theme.onSurfaceVariant }}
                        >
                            { capitalizeFirstChar(props.overline) }
                        </div>
                        : ''
                    }
                    { props.headline
                        ? <div className='headline'
                               style={{ color:theme.onSurface }}
                            >
                            { capitalizeFirstChar(props.headline) }
                        </div>
                        : ''
                    }
                    { props.supportingText.length > 0
                        ? (typeof props.supportingText === "object")
                            ? props.supportingText.map(x=>
                                <div className='supporting-text'>
                                    { x }
                                </div>
                            )
                            : <div className='supporting-text'>
                                { props.supportingText }
                            </div>
                        : ''
                    }
                </div>
                <div className='trailing'>
                    { props.trailing || <RightIcon/> }
                </div>
            </div>
        </div>

        <div className='divider'
             style={borderStyle}
        />

    </>)
}
