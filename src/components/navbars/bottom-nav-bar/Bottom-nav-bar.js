import './navbar-bottom.scss';
import {ReactComponent as TodayIcon } from "../../../scss/icons/today-tasks.svg";
import {ReactComponent as PerformanceIcon } from "../../../scss/icons/performance.svg";
import {ReactComponent as TasksIcon } from "../../../scss/icons/tasks.svg";
import {ReactComponent as AutomationsIcon } from "../../../scss/icons/automations.svg";
import Badge from "../../icon/badge/Badge.js";
import {useCallback, useEffect, useRef} from "react";
import {useTheme} from "../../../ThemeContext.js";

export default function BottomNavBar(){
    const location = window.location.href.split('/').pop();
    const [theme]=useTheme();

    const scrollElement = document.querySelector('html');
    const navbar = useRef();
    let prevScrollNumber = scrollElement.scrollTop;

    const onScroll = useCallback(()=>{

        let scrollNumber = scrollElement.scrollTop;

        if( scrollNumber > 0  ) {
            if( scrollNumber < prevScrollNumber) {

                navbar.current.classList.add('hide');

            }else if (scrollNumber > prevScrollNumber){

                navbar.current.classList.remove('hide');
            }
            prevScrollNumber = scrollNumber;
        }
        else{
            navbar.current.classList.remove('hide');
        }

    },[scrollElement])

    useEffect(()=>{

        document.addEventListener('scroll',onScroll)
        return ()=>{
            document.removeEventListener('scroll',onScroll)
        }

    },[])

    return(<>
        <div ref={navbar}
             id='footerContainer'
             style={{
                 backgroundColor:theme.surface,
                 color:theme.onSurfaceVariant
             }}
        >
            <Badge title = { 'Today Tasks' }
                   url = { '/day-schedule/' }
                   icon = { <TodayIcon /> }
                   active = { location === 'day-schedule' }
            />

            <Badge title={'Automations'}
                   url = {'/automations'}
                   icon = {<AutomationsIcon/>}
                   active = { location === 'automations'}
            />

            <Badge title={'Tasks'}
                   url = {'/tasks'}
                   icon = { <TasksIcon />}
                   active = { location === 'tasks'}
            />
            <Badge title={'Performance'}
                   url = {'/performance/'}
                   icon = {<PerformanceIcon/>}
                   active = { location === 'performance'}
            />
    </div></>)
}