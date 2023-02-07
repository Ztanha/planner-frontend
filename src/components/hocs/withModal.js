import {Modal} from "../modal/Modal.js";
import {useState} from "react";

export const withModal = ( Component,openModal ) => {

    return props => {
        const [ isModalOpen, setIsModalOpen ] = useState( openModal )
        return (
            <Modal  {...props}
                    show={ isModalOpen }
                    hide={ () =>setIsModalOpen(false)}
            >
                    <Component {...props} />
            </Modal>
        )
    }
}