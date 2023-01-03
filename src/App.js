import React from 'react';
import {HashRouter} from 'react-router-dom';

import {DataProvider} from "./ThemeContext.js";
import './scss/App.scss';
import './App.css';

import AnimatedRoutes from "./components/animatedRoutes/AnimatedRoutes.js";

function App() {

    return (
        <div className="app">
            <DataProvider>
                <HashRouter>
                    <AnimatedRoutes/>
                </HashRouter>
            </DataProvider>
        </div>
    )
}

export default App;
