import {useEffect, useRef, useState} from "react";
import {AutoScheduleController} from "../../controllers/AutoScheduleController.js";
import redirect from "../../utilities/redirect.js";
import {Time} from "../../utilities/time.js";
import {decodeWeekdays} from "../../utilities/utilities.js";
import {motion} from "framer-motion";
import ListItem from "../../components/lists/list-item/List-item.js";
import BottomNavBar from "../../components/navbars/bottom-nav-bar/Bottom-nav-bar.js";
import TopNavBar from "../../components/navbars/top-nav-bar/Top-nav-bar.js";

export default function automations () {
    const [aSchedules,setASchedules] =useState();
    const fetchRan = useRef(false);
    // const [reload,setReload] = useState(false);

    function handleDelete(sId) {
        AutoScheduleController.delete(sId).then(resp=>{
            if(resp.status==='success'){
                alert('Deleted!')
                fetchRan.current = false; //to reload the page
            }
        })
    }
    function getTimeString(start,end) {
        if(start === -1 && end === -1) return ''
        start = Time.decode(start);
        end = Time.decode(end);
        if( start !=='' && end !=='' ) return `From ${start.hour}:${start.minute} to  ${end.hour}:${end.minute}`;
        else return '';
    }

    useEffect(()=>{

        if( fetchRan.current === false){

            AutoScheduleController.get().then(resp=>{
                if( resp.status==='success' ){
                    setASchedules(resp.data);
                }
            })
            // setReload(false);
            fetchRan.current = true;
        }

    },[ fetchRan.current ])

    return (<motion.div initial={{ width: 0 }}
                        animate={{ width:'100%' }}
                        exit={{ x: window.innerWidth ,transition:{ duration: 0.1}}}
                        id='page-automations'
        >
        <TopNavBar headline={ 'Automations' }
                   sideMenuItems={[
                       {
                           title: 'New automation',
                           url:'/home'
                       },
                   ]}
        />
            { aSchedules?.length >0
                ? aSchedules.map( x=><ListItem key={ x.id }
                                               effects={true}
                                               click={()=>redirect('/automation/schedule/'+x.id)}
                                               headline={ x.subject }
                                               divider={ false }
                                               trailing={ '' }
                                               supportingText={ [getTimeString(x.start,x.end),decodeWeekdays(x.weekdays)]}
                />)
                : "No auto schedule's saved!" //todo
            }
        {/*<button onClick={()=>redirect('/automation/')}>*/}
        {/*    New Automation*/}
        {/*</button>*/}
        <BottomNavBar/>
    </motion.div>)
}