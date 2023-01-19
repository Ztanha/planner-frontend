import {useEffect, useRef} from "react";
import './autoFiller.scss';

export default function AutoFiller(props) {

    const blinder = useRef();
    const modalContainer = useRef();
    const modal = useRef();

    useEffect(()=>{
        if(props.suggestions?.length >0 ) {
            modalContainer.current.classList.remove('hidden')
        }
    },[props.suggestions])

    function handleClicks(e) {

        if(!modal.current.contains(e.target)) {
            modalContainer.current.classList.add('hidden');
        }
    }

    function handleSelect(elem) {

        props.clickEvent(elem)
    }

    return (<>{ props.suggestions?.length > 0
        ?
        <div ref={modalContainer}
             id='container'
             onClick={handleClicks}
             className='hidden'>

            <div ref={blinder} id='autoFillerBlinder'></div>
            <div ref={modal} id='suggestionsContainer'>

                {props.suggestions.map(x=>
                    <div key={x['id']}
                         onClick={()=>handleSelect(x)} //needs to be a whole object
                    >
                        {x['subject']}
                    </div>
                )}

            </div>
        </div>
        :
        ''
    }
    </>)
}