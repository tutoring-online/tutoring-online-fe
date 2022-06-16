import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// core components
import AuthHeader from "components/Headers/AuthHeader.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import routes, { getFullPath, ROUTES } from "route/routes";
import { useSelector } from "react-redux";
import GeneralNavbar from "components/Navbars/GeneralNavbar";
import { isAdmin } from "settings/setting";
import { isTutor } from "settings/setting";
import { isStudent } from "settings/setting";
import WithAuthBackDropLoader from "./WithAuthBackDropLoader";

import componentStyles from "assets/theme/layouts/auth.js";
const useStyles = makeStyles(componentStyles);

const AuthRoute = (props) => {
    const isSignedIn = useSelector(state => state.auth.isSignedIn);
    const user = useSelector(state => state.auth.user);

    if (isSignedIn) {
        if (isAdmin(user?.role)) {
            return <Redirect from="*" to={getFullPath(ROUTES.dashboard)} />
        }

        if (isTutor(user?.role)) {
            return <Redirect from="*" to={getFullPath(ROUTES.home)} />
        }

        if (isStudent(user?.role)) {
            return <Redirect from="*" to={getFullPath(ROUTES.home)} />
        }

        return <Redirect from="*" to={getFullPath(ROUTES.redirectHome)} />
    }

    return (
        <Route {...props} />
    );
}

const getRoutes = () => {
    const authRoutes = routes.filter(route => route.layout === "/auth");

    return authRoutes.map((prop, key) => {
        if (prop.path === "/logout") {
            return <Route
                path={prop.layout + prop.path}
                exact
                key={prop.key || key}
                component={prop.component}
            />
        }

        return (
            <AuthRoute
                path={prop.layout + prop.path}
                component={prop.component}
                key={prop.key || key}
            />
        );
    });
};

const Auth = ({ authLoading }) => {
    const classes = useStyles();
    const mainContent = React.useRef(null);
    const location = useLocation();

    React.useEffect(() => {
        document.body.classList.add(classes.bgDefault);
        return () => {
            document.body.classList.remove(classes.bgDefault);
        };
    });

    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    return (
        <WithAuthBackDropLoader open={authLoading}>
            <div className="main-content" ref={mainContent}>
                <GeneralNavbar />
                <AuthHeader />
                <Container
                    component={Box}
                    maxWidth="xl"
                    marginTop="-8rem"
                    paddingBottom="3rem"
                    position="relative"
                    zIndex="101"
                >
                    <Box component={Grid} container justifyContent="center">
                        <Switch>
                            {getRoutes()}
                            <Redirect from="*" to="/auth/login" />
                        </Switch>
                    </Box>
                </Container>
            </div>
            <AuthFooter />
        </WithAuthBackDropLoader>
    );
};

export default Auth;
