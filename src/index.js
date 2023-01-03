import React from "react";
import ReactDOM from "react-dom/client";
import store from "./app/store.js";
import {Provider} from "react-redux";
import '../src/scss/fonts/Roboto/Roboto-Black.ttf';
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

reportWebVitals();

