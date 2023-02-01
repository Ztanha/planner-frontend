
import './home.scss';
import { motion } from "framer-motion";
import ListItem from "../../components/lists/list-item/List-item.js";
import TopNavBar from "../../components/navbars/top-nav-bar/Top-nav-bar.js";
import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import dayTimestamp from "../../utilities/dayTimestamp.js";
import UserController from "../../controllers/UserController.js";
import ScheduleController from "../../controllers/ScheduleController.js";
import {schedulesLoaded} from "../../features/schedules/scheduleSlice.js";
import Card from "../../components/cards/Card.js";
import IconAndBackground from "../../components/icon/icon&background/IconAndBackground.js";
import {ReactComponent as TasksIcon} from "../../scss/icons/list.svg";
import {ReactComponent as AutomationsIcon} from "../../scss/icons/event_repeat.svg";
import Leading from "../../components/leading/Leading.js";
import {ReactComponent as OnGoingTaskIcon} from "../../scss/icons/upcoming.svg";
import Button from "../../components/buttons/common-buttons/Button.js";
import StackedCard from "../../components/cards/stacked-card/Stacked-card.js";
import {useTheme} from "../../ThemeContext.js";
import {useUser} from "../../UserContext.js";
import {useNavigate} from "react-router-dom";
import {ResourceLoader} from "../../components/ResourceLoader.js";
import {ScheduleListItems} from "../../components/ScheduleListItems.js";

export default function Home() {
    const navigate= useNavigate();
    const today = dayTimestamp.getTimeStamp();
    const [theme] =useTheme();
    const [user] = useUser();

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
                                           click={ ()=>navigate('/day-schedule/') }
                                    >
                                        See all
                                    </Button>
                                }
                                 buttons={[]}
                    >
                        <ResourceLoader resourceUrl={'schedules/'}
                                        resourceName={'schedule'}
                                        data={{
                                                date: Math.floor(today/1000),
                                        }}
                        >
                            <ScheduleListItems />
                        </ResourceLoader>
                    </StackedCard>
                </div>
            </div>
        </div>
    </div>

    </motion.div>)
}