import React from "react"

import Router from "./route/index";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store"
import { PersistGate } from "redux-persist/integration/react"
import { ToastContainer } from "react-toastify";

import CssBaseline from "@mui/material/CssBaseline";
import theme from "assets/theme/theme.js";
import "assets/plugins/nucleo/css/nucleo.css";
import "assets/scss/argon-dashboard-react.scss";
import "react-toastify/dist/ReactToastify.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import BackDropLoader from "components/Loading/BackDropLoader";

import Information from "components/Information.jsx";

export default function App() {
    return (
        <>
            <ToastContainer />
            <Provider store={store}>
                <PersistGate loading={<BackDropLoader open={true} />} persistor={persistor}>
                    <StyledEngineProvider injectFirst>
                        <ThemeProvider theme={theme}>
                            <CssBaseline />

                            <Router />
                            <Information />
                        </ThemeProvider>
                    </StyledEngineProvider>
                </PersistGate>
            </Provider>
        </>
    );
}
