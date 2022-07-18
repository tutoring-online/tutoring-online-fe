import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";

// MUI
import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import NavbarDropdown from "components/Dropdowns/NavbarDropdown.js";
import componentStyles from "assets/theme/layouts/admin.js";
import logoImg from "assets/img/brand/logo.png";
import WithAuthBackDropLoader from "./WithAuthBackDropLoader";

//Helpers and setting
import routes from "route/routes.js";
import { isAvailableArray } from "helpers/arrayUtils";
import { ROUTE_PATHS } from "route/routes";
import { LAYOUT_PATHS } from "route/routes";
import { isTutor } from "settings/setting";

const useStyles = makeStyles(componentStyles);

const PrivateRoute = (props) => {
    const isSignedIn = useSelector(state => state.auth.isSignedIn);
    const user = useSelector(state => state.auth.user);

    if (isSignedIn && isTutor(user?.role)) {
        return <Route {...props} />
    }

    return (
        <Redirect from="*" to="/auth/login" />
    );
}

const getTutorRoutes = () => {
    const tutorRoutes = routes.filter(route => route.layout === LAYOUT_PATHS.tutor);
    return isAvailableArray(tutorRoutes) ? [...tutorRoutes] : [];
}

const getRoutes = () => {
    const routes = getTutorRoutes();

    return routes.map((prop, key) => {
        return (
            <PrivateRoute
                path={prop.layout + prop.path}
                component={prop.component}
                key={prop.key || key}
            />
        );
    });
};

const getLogoutRoute = () => {
    const logoutRoute = routes.find(route => route.path === ROUTE_PATHS.logout);
    return logoutRoute || null;
}

const getSidebarRoutes = () => {
    const sidebarRoutes = [];
    const routes = getTutorRoutes();
    sidebarRoutes.push(...routes);

    const logoutRoute = getLogoutRoute();
    if (logoutRoute) {
        sidebarRoutes.push(logoutRoute);
    }

    return sidebarRoutes;
}

const Tutor = ({ authLoading }) => {
    const classes = useStyles();
    const location = useLocation();

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [location]);

    const getBrandText = () => {
        for (let i = 0; i < routes.length; i++) {
            if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return routes[i].name;
            }
        }
        return "Brand";
    };

    return (
        <WithAuthBackDropLoader open={authLoading}>
            <Sidebar
                routes={getSidebarRoutes()}
                logo={{
                    innerLink: "/home/index",
                    imgSrc: logoImg,
                    imgAlt: "...",
                }}
                dropdown={<NavbarDropdown />}
            />
            <Box position="relative" className={classes.mainContent}>
                <AdminNavbar brandText={getBrandText(location.pathname)} />
                <Switch>
                    {getRoutes()}
                    <Redirect from="*" to="/home/index" />
                </Switch>
                <Container
                    maxWidth={false}
                    component={Box}
                    classes={{ root: classes.containerRoot }}
                >
                    <AdminFooter />
                </Container>
            </Box>
        </WithAuthBackDropLoader>
    );
};

export default Tutor;
