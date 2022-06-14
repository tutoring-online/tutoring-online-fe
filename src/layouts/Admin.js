import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";

import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
// @mui/icons-material components
import Search from "@mui/icons-material/Search";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import NavbarDropdown from "components/Dropdowns/NavbarDropdown.js";
import componentStyles from "assets/theme/layouts/admin.js";
import logoImg from "assets/img/brand/argon-react.png";

import routes from "route/routes.js";
import { isAvailableArray } from "helpers/arrayUtils";
import { ROUTE_PATHS } from "route/routes";
import { isAdmin } from "settings/setting";

const useStyles = makeStyles(componentStyles);

const PrivateRoute = (props) => {
    const isSignedIn = useSelector(state => state.auth.isSignedIn);
    const user = useSelector(state => state.auth.user);

    if (isSignedIn && isAdmin(user?.role)) {
        return <Route {...props} />
    }

    return (
        <Redirect from="*" to="/auth/login" />
    );
}

const getAdminRoutes = () => {
    const adminRoutes = routes.filter(route => route.layout === "/admin");
    return isAvailableArray(adminRoutes) ? [...adminRoutes] : [];
}

const getRoutes = () => {
    const adminRoutes = getAdminRoutes();

    return adminRoutes.map((prop, key) => {
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
    const adminRoutes = getAdminRoutes();
    sidebarRoutes.push(...adminRoutes);

    const logoutRoute = getLogoutRoute();
    if (logoutRoute) {
        sidebarRoutes.push(logoutRoute);
    }

    return sidebarRoutes;
}

const Admin = () => {
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
        <>
            <>
                <Sidebar
                    routes={getSidebarRoutes()}
                    logo={{
                        innerLink: "/home/index",
                        imgSrc: logoImg,
                        imgAlt: "...",
                    }}
                    dropdown={<NavbarDropdown />}
                    input={
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-search-responsive">
                                Search
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-search-responsive"
                                type="text"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Box
                                            component={Search}
                                            width="1.25rem!important"
                                            height="1.25rem!important"
                                        />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    }
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
            </>
        </>
    );
};

export default Admin;
