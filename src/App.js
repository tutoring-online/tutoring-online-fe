import React from 'react'

import Router from "./route/index";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import theme from "assets/theme/theme.js";

import { store } from './redux/store'
import { Provider } from 'react-redux';

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

export default function App() {
    return (
        //Redux
        <Provider store={store}>
            {/*Template*/}
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline />

                    <Router />
                </ThemeProvider>
            </StyledEngineProvider>
        </Provider>
    );
}