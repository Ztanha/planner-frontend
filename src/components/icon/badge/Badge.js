import redirect from "../../../utilities/redirect.js";
import './badge.scss';
import {useTheme} from "../../../ThemeContext.js";
import {formatColor} from "../../../utilities/colors.js";

export default function Badge(props) {

    const [theme]=useTheme();
    let classes = props.active ? 'active ' :'';
    classes = classes+'navbar-icon';
    const bgColor = `rgba(${ formatColor(theme.primary) }, .08)`

    const handleClick=()=>{
        if(typeof props.url !== "undefined") {
            redirect(props.url)
        }
    }

    return(<div className={ classes }>
            <div onClick={ handleClick }
                 className={ 'badge-shape-container' }
                 style={{backgroundColor:bgColor}}
            >
                { props.icon }
            </div>
            <div className='title-container'>
                { props.title }
            </div>
        </div>
    )
}