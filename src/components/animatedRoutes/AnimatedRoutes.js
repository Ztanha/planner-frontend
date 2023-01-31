import {Navigate, Outlet, Route, Routes, useLocation} from "react-router-dom";
import Login from "../../views/login/Login.js";
import Home from "../../views/home/Home.js";
import DaySchedule from "../../views/home/DaySchedule.js";
import Tasks from "../../views/tasks/Tasks.js";
import Task from "../../views/task/Task.js";
import Automation from "../../views/automations/automation/Automation.js";
import NewSchedule from "../../views/schedules/new/NewSchedule.js";
import NewPlan from "../../views/newPlan/newPlan.js";
import Automations from "../../views/automations/automations.js";
import Performance from "../../views/performance/Performance.js";
import React from "react";
import { AnimatePresence } from 'framer-motion';
import { useUser } from "../../UserContext.js";

function AnimatedRoutes() {
    const location = useLocation();
    const [user] = useUser();

    const ProtectedRoute = ({
        user,
        redirectPath = '/login',
    }) => {
        if (!user) {
            return <Navigate to={redirectPath} replace />;
        }
        return <Outlet />;
    };

    return(
        <AnimatePresence>
            <Routes location={ location } key={ location.pathname }>
                <Route path='/login' element={<Login/>}/>
                <Route element={<ProtectedRoute user={user} />}>
                    <Route path="home" element={<Home />} />
                    <Route path='/day-schedule/:date' element={<DaySchedule/>}/>
                    <Route path='/day-schedule/' element={<DaySchedule/>}/>
                    <Route path='/tasks' element={<Tasks/>}/>
                    <Route path='/task/:tId' element={<Task/>}/>
                    <Route path='/automation/task/:tId' element={<Automation/>}/>
                    <Route path='/automation/schedule/:sId' element={<Automation/>}/>
                    <Route path='/automation/' element={<Automation/>}/>
                    <Route path='/schedule/task/:tId' element={<NewSchedule/>}/>
                    <Route path='/schedule/task/' element={<NewSchedule/>}/>
                    <Route path='/plan/new/:date' element={<NewPlan/>}/>
                    <Route path='/automations' element={<Automations/>}/>
                    <Route path='/performance/' element={<Performance/>}/>
                </Route>
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes;