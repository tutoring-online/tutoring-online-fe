import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// core components
import AuthFooter from "components/Footers/AuthFooter.js";
import GeneralNavbar from "components/Navbars/GeneralNavbar";

import componentStyles from "assets/theme/layouts/auth.js";
import routes from "route/routes.js";
import { LAYOUT_PATHS } from "route/routes";
import { getFullPath } from "route/routes";
import { ROUTES } from "route/routes";

const useStyles = makeStyles(componentStyles);

const getRoutes = () => {
    const detailRoutes = routes.filter(route => route.layout === LAYOUT_PATHS.detail);

    return detailRoutes.map((prop, key) => (
        <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={prop.key || key}
        />
    ))
};

const Home = () => {
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
        <>
            <div className="main-content" ref={mainContent}>
                <GeneralNavbar />
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
                            <Redirect from="*" to={getFullPath(ROUTES.home)} />
                        </Switch>
                    </Box>
                </Container>
            </div>
            <AuthFooter />
        </>
    );
};

export default Home;
