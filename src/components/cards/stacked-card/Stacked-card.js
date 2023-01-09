import './stacked-card.scss';
import ListItem from "../../lists/list-item/List-item.js";
import Card from "../Card.js";
import Button from "../../buttons/common-buttons/Button.js";

export default function StackedCard(props) {
    const cardType = props.style || 'elevated'
    return (
        <Card type={cardType} classes={props.classes}>
             <ListItem   trailing = {props.trailing}
                         leading={props.leading}
                         headline = {props.title}
                         overline={props.overline || ''}
                         supportingText = {props.subhead || ''}
             />
             <div className='lists'>
                 {props.children}
             </div>
            <div className='buttons-container'>
                {/*{props.buttons || ''}*/}
                {/*{props.buttons.map(x=>(*/}
                {/*    <Button></Button>*/}
                {/*))}*/}
            </div>

        </Card>)
}