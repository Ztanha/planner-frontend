import './snack-bar.scss'
import { ReactComponent as Close } from "../../scss/icons/close.svg";
import { useEffect } from "react";
import {useTheme} from "../../ThemeContext.js";

export default function SnackBar(props) {

    const [theme]=useTheme();
    function handleClose() {
        props.setShow(false);
    }
    useEffect(()=> {

        if( props.show === true ) {

            setTimeout(()=>{

                handleClose();
                if( typeof props.onAfterShow !== "undefined") props.onAfterShow();

            },3000)
        }

    },[props.show])

    return( props.show
            ? <div className='snack-bar-component'
                   style={{
                       backgroundColor:theme.inverseSurface,
                       color:theme.onInverseSurface
                   }}
            >
                { props.headline
                    ? <div className='headline-container'>
                        { props.headline }
                    </div>
                    : ''
                }
                { props.closeAffordance === true
                    ? <div className='icon'>
                        <Close onClick={ handleClose }
                                 fill={ theme.onInverseSurface }
                        />
                    </div>
                    : ''
                }
                { typeof props.supportingText !== "undefined"
                    ? <div className='s-text-container'>
                        { props.supportingText }
                    </div>
                    : '' }
                { typeof props.buttons !== "undefined"
                    ? <div className='buttons-container'>
                        { props.buttons }
                    </div>
                    : '' }
            </div>
            : ''
        )
}