import React from 'react'

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { hot } from 'react-hot-loader/root';
import theme from "assets/theme/theme.js";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

const App = () => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter basename="/">
                    <Switch>
                        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
                        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
                        <Redirect from="/" to="/auth/login" />
                    </Switch>
                </BrowserRouter>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default hot(App);