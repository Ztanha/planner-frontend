import React from 'react';
import {HashRouter} from 'react-router-dom';

import {ThemeProvider} from "./ThemeContext.js";
import './scss/App.scss';
import './App.css';

import AnimatedRoutes from "./components/animatedRoutes/AnimatedRoutes.js";
import {UserProvider} from "./UserContext.js";

function App() {

    return (
        <div className="app">
            <ThemeProvider>
                <UserProvider>
                    <HashRouter>
                        <AnimatedRoutes/>
                    </HashRouter>
                </UserProvider>
            </ThemeProvider>
        </div>
    )
}

export default App;
