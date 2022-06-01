import React, { useEffect } from "react";
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

import routes from "route/routes.js";

import componentStyles from "assets/theme/layouts/admin.js";

import logoImg from "assets/img/brand/argon-react.png";
import { useSelector } from "react-redux";

const useStyles = makeStyles(componentStyles);

const PrivateRoute = (props) => {
    const isSignedIn = useSelector(state => state.auth.isSignedIn);

    if (!isSignedIn) {
        return <Redirect from="*" to="/auth/login" />
    }

    return (
        <Route {...props} />
    );
}

const Admin = () => {
    const classes = useStyles();
    const location = useLocation();

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [location]);

    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/admin") {
                return (
                    <PrivateRoute
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
                    routes={routes}
                    logo={{
                        innerLink: "/admin/index",
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
                        {getRoutes(routes)}
                        <Redirect from="*" to="/admin/index" />
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
