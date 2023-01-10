import redirect from "../../../utilities/redirect.js";
import './badge.scss';
import {useTheme} from "../../../ThemeContext.js";
import {formatColor} from "../../../utilities/colors.js";
import {useState} from "react";

export default function Badge(props) {

    const [state,setState] = useState('default');
    const [theme] = useTheme();
    let classes = props.active ? 'active ' :'';
    classes = classes+'navbar-icon';
    const styles={
        default:{
            backgroundColor:'transparent'
        },
        focused:{
            backgroundColor: `rgba(${ formatColor(theme.primary) }, .08)`,
            color:theme.onSurfaceVariant
        },
        activated:{
            backgroundColor: `rgba(${ formatColor(theme.primary) }, .12)`,
        }
    }

    const handleClick=()=>{
        if(typeof props.url !== "undefined") {
            redirect(props.url)
        }
    }

    return(<div className={ classes }>
            <div onClick={ handleClick }
                 className={ 'badge-shape-container' }
                 onMouseEnter={()=>setState('focused')}
                 onMouseLeave={()=>setState('default')}
                 onMouseDown={()=>setState('activated')}
                 style={ props.active
                     ? styles["focused"]
                     : styles[state]
                }
            >
                { props.icon }
            </div>
            <div className={ state ==='focused'
                                ? 'title-container display-block'
                                : 'title-container'
            }>
                { props.title }
            </div>
        </div>
    )
}