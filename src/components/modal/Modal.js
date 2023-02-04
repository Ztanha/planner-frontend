
import './modal.scss'
import {useTheme} from "../../ThemeContext.js";
import React from "react";

function Modal( props ) {
    const [ colors ]=useTheme();
    return (
        props.show ? (
            <div className='modal-comp'
                 onClick={ props.hide }
                 style={{ backgroundColor:colors.scrim }}
            >
                <div className='modal-cont'
                    style={{ background : colors.surface3,
                             color : colors.onSurface,
                             width:props.width+'px'
                    }}
                >
                    { props.children }

                </div>
            </div>
        ) : (
            ''
        )
    );
}
export { Modal };
