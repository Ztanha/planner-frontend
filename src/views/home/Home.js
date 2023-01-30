
import './home.scss';
import { motion } from "framer-motion";
import ListItem from "../../components/lists/list-item/List-item.js";
import TopNavBar from "../../components/navbars/top-nav-bar/Top-nav-bar.js";
import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import dayTimestamp from "../../utilities/dayTimestamp.js";
import UserController from "../../controllers/UserController.js";
import {userLoaded} from "../../features/userInfo/userInfoSlice.js";
import ScheduleController from "../../controllers/ScheduleController.js";
import {schedulesLoaded} from "../../features/schedules/scheduleSlice.js";
import Card from "../../components/cards/Card.js";
import IconAndBackground from "../../components/icon/icon&background/IconAndBackground.js";
import {ReactComponent as TasksIcon} from "../../scss/icons/list.svg";
import {ReactComponent as AutomationsIcon} from "../../scss/icons/event_repeat.svg";
import Leading from "../../components/leading/Leading.js";
import {ReactComponent as OnGoingTaskIcon} from "../../scss/icons/upcoming.svg";
import Button from "../../components/buttons/common-buttons/Button.js";
import IconText from "../../components/icon/icon&text/Icon&text.js";
import {ReactComponent as ClockIcon} from "../../scss/icons/clock.svg";
import {Time} from "../../utilities/time.js";
import StackedCard from "../../components/cards/stacked-card/Stacked-card.js";
import redirect from '../../utilities/redirect.js'
import {useTheme} from "../../ThemeContext.js";
import {useUser} from "../../UserContext.js";

export default function Home() {
    let fetchRan  = useRef(false);
    // const user = useSelector((state)=>state.user)
    const schedules = useSelector((state) => state.schedules)
    const dispatch = useDispatch();
    const today = dayTimestamp.getTimeStamp();
    const [theme] =useTheme();
    const [user] = useUser();

    console.log(user)

    function getTime(start,end){
        const s = Time.decode(start);
        const e = Time.decode(end)
        return s.hour+':'+s.minute+ ' - '+ e.hour+':'+e.minute
    }
    // useEffect(()=>{
    //
    //     if( fetchRan.current === false ) {
    //         if(user.id === '' ){
    //             UserController.getName().then(resp=> {
    //
    //                 if(resp.status === 'success') {
    //                     const user = resp.data;
    //                     dispatch(userLoaded({
    //                         id : user.id,
    //                         email : user.email,
    //                         name : user.name
    //                     }))
    //                 }
    //             });
    //         }
    //         ScheduleController.get(today).then(resp=>{
    //             if(resp.status==='success' && resp.data.length >0){
    //                 dispatch(schedulesLoaded(resp.data));
    //             }
    //         })
    //         fetchRan.current = true;
    //     }
    //
    // },[user])
    return(<motion.div initial={{ width: 0 }}
                       animate={{ width:'100%' }}
                       exit={{ x: window.innerWidth ,transition:{ duration: 0.1}}}
                       className='home'
    ><div className='home-page-background'>
        <div className='first'></div>
        <div className='sec'></div>
        <div className='third'></div>
    </div>
    <div className='page'>
        <TopNavBar headline={user.name || ''}
                   overline={'Morning!'}
                   sideMenuItems={[
                       {
                           title: 'Test',
                           url:'/home'
                       },
                   ]}
                   style={{}}
        />
        <div className='home-page-2'>
            <div className='cards-structure'>
                <div className='tasks-area'>
                    <Card classes={'area1'}
                          type={'filled'}
                          onClickUrl={'/tasks'}
                    ><IconAndBackground icon={<TasksIcon />}/>
                        Tasks
                    </Card>
                </div>
                <div className='performance-area'>
                    <Card classes={'area2'}
                          type={'outlined'}
                          onClickUrl={''}
                    >
                        {/*todo performance*/}
                    </Card>
                </div>
                <div className='automation-area'>
                    <Card classes={'area3'}
                          type={'filled'}
                          onClickUrl={'/automations'}
                    ><IconAndBackground icon={<AutomationsIcon/>}/>
                        Automations
                    </Card>
                </div>
                <div className='ongoing-tasks-area'>
                    <StackedCard classes={'area4'}
                                 leading={<Leading type={'icon'}
                                                   icon={<IconAndBackground icon={<OnGoingTaskIcon/>}/>}
                                 />}
                                 style={{ backgroundColor:theme.surface}}
                                 title={'Ongoing Tasks'}
                                 trailing={
                                    <Button type={'text'}
                                           click={ ()=>redirect('/day-schedule/') }
                                    >
                                        See all
                                    </Button>
                                }
                                 buttons={[]}
                    >
                        { schedules.data.length >0

                            ? schedules.data.map(schedule=>
                                <ListItem headline={schedule.subject}
                                          key={schedule.id}
                                          trailing={' '}
                                          supportingText={<IconText
                                              icon={<ClockIcon/>}
                                              text={getTime(schedule.start,schedule.end)}
                                          />}
                                />)
                            : <ListItem supportingText={'No task yet'}
                                        trailing={' '}
                            />
                        }
                    </StackedCard>
                </div>
            </div>
        </div>
    </div>

    </motion.div>)
}