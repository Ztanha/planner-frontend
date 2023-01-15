import './chips.scss';
import {ReactComponent as Tik} from "../../scss/icons/tik.svg";
import {useState} from "react";
import {useTheme} from "../../ThemeContext.js";

//Types : assist , filter , input , suggestion
function Chip(props){

    const theme = useTheme();
    const [ state,setState ]=useState('default')
    const styles = {
        filter:{
            default:{
                backgroundColor:theme.surface,
                color:theme.onSurfaceVariant,
                border:`1px solid ${ theme.outline }`
            },
            selected:{
                backgroundColor:theme.secondaryContainer,
            },
            hover:{
              backgroundColor:theme.primary,
            }
        }
    }
    const style = {...styles[props.type]['default'],...styles[ props.type ][ props.selected ? 'selected' :'default' ]}
    return(
        <div className='chip-component'>
            <div className ='background-effects'>
                <div className={ props.selected ? `selected ${ props.type }` : props.type }
                         style={ style }
                         onClick={ props.click }
                    >
                    { props.selected && props.type === 'filter'
                        ? <div className='icon'><Tik /></div>
                        : ''
                    }
                    <div className='label'>
                        { props.label }
                    </div>
                </div>
            </div>
        </div>
    )
}



// export function Filter(props) {
//
//
//     return(<div className={ props.selected ? 'selected filter' : 'filter'}
//                 onClick={props.click}>
//
//             { props.selected
//                 ? <div className='icon'><Tik /></div>
//                 : ''
//             }
//         <div className='label'>
//             { props.label }
//         </div>
//     </div>)
// }
// export default function Chip(props ){
//     let gooz;
//     const [ selected , setSelected ] = useState();
//     function handleSelect(){
//         props.click(props.label,!selected);
//         setSelected(!selected);
//     }
//
//     switch ( props.type ) {
//         case 'filter':
//             gooz =  <Filter selected={ selected }
//                             label={ props.label }
//                             click={ handleSelect }
//             />
//     }
//     return (<div className={ selected
//             ? 'chip-component selected'
//             : 'chip-component'
//         }>
//         <div className ='background-effects'>
//             { gooz }
//         </div>
//     </div>)
// }
export {Chip}