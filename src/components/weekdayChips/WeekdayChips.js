import {Chip} from "../chips/Chip.js";
import './weekdaysChips.scss'

function WeekdayChips(props) {
    const weekDays = [ 'Su','Mo','Tu','We','Th','Sa','Fr' ];
    function handleSelectDay(label) { //todo

        String.prototype.replaceAt = function (index, replacement) {
            return this.substring(0, index) + replacement +
                this.substring(index + 1);
        }
        const idx = weekDays.indexOf(label);
        props.setActiveDays( props.activeDays.replaceAt(idx,1-props.activeDays[idx]) );
    }
    return (
        <div id={'calendar'}>
            { weekDays.map((x,index)=>
                <Chip type={ 'filter' }
                      label={ x }
                      key={ x }
                      click={ ()=>handleSelectDay(x) }
                      selected={ props.activeDays[index]==='1' }
                />
            )}
        </div>
    )
}
export {WeekdayChips}