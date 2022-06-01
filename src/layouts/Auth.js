import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthHeader from "components/Headers/AuthHeader.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import componentStyles from "assets/theme/layouts/auth.js";
import routes from "route/routes.js";
import { useSelector } from "react-redux";

const useStyles = makeStyles(componentStyles);

const AuthRoute = (props) => {
    const isSignedIn = useSelector(state => state.auth.isSignedIn);

    console.log(isSignedIn);

    if (isSignedIn) {
        return <Redirect from="*" to="/admin/dashboard" />
    }

    return (
        <Route {...props} />
    );
}


const Auth = () => {
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

    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/auth") {
                return (
                    <AuthRoute
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };

    return (
        <>
            <div className="main-content" ref={mainContent}>
                <AuthNavbar />
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
                            {getRoutes(routes)}
                            <Redirect from="*" to="/auth/login" />
                        </Switch>
                    </Box>
                </Container>
            </div>
            <AuthFooter />
        </>
    );
};

export default Auth;
