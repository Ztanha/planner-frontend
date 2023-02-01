import './card.scss'
import redirect from "../../utilities/redirect.js";
import {useState} from "react";
import {formatColor} from "../../utilities/colors.js";
import {useTheme} from "../../ThemeContext.js";
import {useNavigate} from "react-router-dom";



export default function Card(props) {

    const [ state,setState ]=useState('default');
    const [theme] = useTheme();
    const navigate=useNavigate()
    const styles={
        filled:{
            default:{
                backgroundColor:theme.surfaceVariant
            },
            hovered:{
                backgroundColor:`rgba(${ formatColor(theme.primary) }, .08)` ,
            },
            activated:{

                backgroundColor:`rgba(${ formatColor(theme.primary) }, .12)` ,
            }
        },
        outlined:{
            default:{
                backgroundColor:theme.surface,
                border: `0.062em solid ${theme.outlineVariant}`,
            },
            hovered:{
                backgroundColor:`rgba(${ formatColor(theme.primary) }, .08)` ,
            },
            activated:{

                backgroundColor:`rgba(${ formatColor(theme.primary) }, .12)` ,
            }
        },
        elevated:{
            default:{
                backgroundColor:theme.surface
            },
            hovered:{
                backgroundColor:`rgba(${ formatColor(theme.primary) }, .08)` ,
            },
            activated:{

                backgroundColor:`rgba(${ formatColor(theme.primary) }, .12)` ,
            }
        }
    }
    const classes = `card-container ${props.type} ${props.classes || ''}`;
    const url = props.onClickUrl || '';
    const cardStyle = styles[props.type][state];
    return (
        <div className='card-component'
             onMouseEnter={()=>setState('hovered')}
             onMouseLeave={()=>setState('default')}
             onMouseDown={()=>setState('activated')}
        >
            <div className={classes}
                 style={ cardStyle }
            >
                <div onClick={()=>navigate(url)}>
                    <div className='content'>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )}
