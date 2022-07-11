import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// core components
import AuthFooter from "components/Footers/AuthFooter.js";
import GeneralNavbar from "components/Navbars/GeneralNavbar";

import routes from "route/routes.js";
import { LAYOUT_PATHS } from "route/routes";
import { getFullPath } from "route/routes";
import { ROUTES } from "route/routes";
import HomeHeader from "views/home/HomeHeader";
import WithAuthBackDropLoader from "./WithAuthBackDropLoader";
import SearchBox from "views/home/SearchBox";

const getRoutes = () => {
    const homeRoutes = routes.filter(route => route.layout === LAYOUT_PATHS.home);

    return homeRoutes.map((prop, key) => (
        <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={prop.key || key}
        />
    ))
};

const Home = ({ authLoading }) => {
    const mainContent = React.useRef(null);
    const location = useLocation();

    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    return (
        <WithAuthBackDropLoader open={authLoading}>
            <div className="main-content" ref={mainContent}>
                <GeneralNavbar />
                <HomeHeader />
                <SearchBox/>
                <Container
                    component={Box}
                    maxWidth="xl"
                    marginTop="6rem"
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
        </WithAuthBackDropLoader>
    );
};

export default Home;
