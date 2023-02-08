import TextField from "../text-field/TextField.js";
import {useState} from "react";

const withNewTaskInput = (action, onNext ) => {
    const [ value,setValue ] = useState();
    const [ msg , setMsg ] = useState('Ex. Yoga');
    const [ savingStatus,setSavingStatus ] = useState('');

    return <TextField leading = { false }
                      label = { 'subject' }
                      supportingText = { msg }
                      trailing = { savingStatus }
                      value = { value }
                      setValue = { setValue }
            />
}
export default withNewTaskInput;