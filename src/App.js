import React from 'react'

import Router from "./route/index";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import theme from "assets/theme/theme.js";

import { Provider } from 'react-redux';

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

export default function App() {
    return (
        //Redux
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {/*Template*/}
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />

                        <Router />
                    </ThemeProvider>
                </StyledEngineProvider>
            </PersistGate>
        </Provider>
    );
}
