import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import * as ServiceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

// Background FCM notifications
ServiceWorker.registerFcm();