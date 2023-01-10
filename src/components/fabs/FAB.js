import './FAB.scss';
import {useTheme} from "../../ThemeContext.js";
import {useState} from "react";
import {formatColor} from "../../utilities/colors.js";

export default function FAB(props) {

    const [theme]= useTheme();
    const [state,setState]=useState('default');
    const mainColor = props.bgColor || theme.primary;
    const styles={
        default:{
            backgroundColor:`transparent`
        },
        hovered:{
            backgroundColor:`rgba(${ formatColor(mainColor) }, .08)` ,
        },
        activated:{
            backgroundColor:`rgba(${ formatColor(mainColor) }, .12)` ,
        }
    }

    return (<>
        <div className='fab'
             onClick={props.click}
             onMouseEnter={()=>setState('hovered')}
             onMouseLeave={()=>setState('default')}
             onMouseDown={()=>setState('activated')}
             style={{backgroundColor:theme.primaryContainer}}
        >
            <div className='fb-bg-effect'
                 style={styles[state]}
            />
            <div style={{zIndex:6}}>{props.icon}</div>
        </div>
    </>)
}
