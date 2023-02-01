import './dialog.scss'
import {Modal} from "../modal/Modal.js";

export default function Dialog(props) {

    return (<div className='dialog-component'>
        <Modal show={ props.show } hide={ props.hide } >
                 <div className='dialog-container'>
                     { props.icon || '' }
                     <div className='dialog-title'>
                         { props.title || '' }
                     </div>
                     <div className='dialog-content'>
                         { props.children }
                     </div>
                     <div className='dialog-buttons'>
                          { props.buttons || '' }
                      </div>
                  </div>
        </Modal>
    </div>)
}
