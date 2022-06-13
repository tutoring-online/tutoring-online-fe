import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
// @mui/icons-material components
import Clear from "@mui/icons-material/Clear";
import Dashboard from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import Person from "@mui/icons-material/Person";
import VpnKey from "@mui/icons-material/VpnKey";
import HomeIcon from '@mui/icons-material/Home';

// core components
import componentStyles from "assets/theme/components/auth-navbar.js";

import LogoWhite from "assets/img/brand/argon-react-white.png";
import Logo from "assets/img/brand/argon-react.png";
import { getFullPath } from "route/routes";
import { ROUTES } from "route/routes";
import { isAvailableArray } from "helpers/arrayUtils";
import { useSelector } from "react-redux";
import { isAdmin } from "settings/setting";

const useStyles = makeStyles(componentStyles);

const menuId = "responsive-menu-id";

export default function GeneralNavbar() {
    const classes = useStyles();
    const theme = useTheme();

    const history = useHistory();
    const user = useSelector(state => state.auth.user);
    const isSignedIn = useSelector(state => state.auth.isSignedIn);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOnClickLogo = () => {
        history.push("/index");
    }

    const [listItem, setListItem] = useState([]);

    useEffect(() => {
        const list = [
            {
                to: getFullPath(ROUTES.home),
                label: "Home",
                icon: HomeIcon
            },
            isSignedIn && isAdmin(user?.role) && {
                to: getFullPath(ROUTES.dashboard),
                label: "Dashboard",
                icon: Dashboard
            },
            !isSignedIn && {
                to: getFullPath(ROUTES.login),
                label: "Login",
                icon: VpnKey
            },
            isSignedIn && isAdmin(user?.role) && {
                to: getFullPath(ROUTES.profile),
                label: "Profile",
                icon: Person
            },
            isSignedIn && {
                to: getFullPath(ROUTES.logout),
                label: "Logout",
                icon: VpnKey
            },
        ];
        setListItem(() => list.filter(item => Boolean(item)));
    }, [isSignedIn, user])

    const ListObject = (
        <Box
            display="flex"
            alignItems="center"
            width="auto"
            component={List}
            className={classes.flexDirectionColumn}
        >
            {isAvailableArray(listItem) && listItem.map((item, index) =>
                <ListItem
                    key={item.to || index}
                    component={Link}
                    to={item.to}
                    onClick={handleMenuClose}
                    classes={{
                        root: classes.listItemRoot,
                    }}
                >
                    <Box
                        component={item.icon}
                        width="1.25rem!important"
                        height="1.25rem!important"
                        marginRight=".5rem!important"
                    />
                    {item.label || "N/A"}
                </ListItem>
            )}
        </Box>
    );
    return <>
        <AppBar position="absolute" color="transparent" elevation={0}>
            <Toolbar>
                <Container
                    display="flex!important"
                    justifyContent="space-between"
                    alignItems="center"
                    marginTop=".75rem"
                    component={Box}
                    maxWidth="xl"
                >
                    <Box
                        component={Link}
                        to={getFullPath(ROUTES.home)}
                        onClick={handleOnClickLogo}
                    >
                        <Box
                            alt="..."
                            height="30px"
                            component="img"
                            className={classes.headerImg}
                            src={LogoWhite}
                            onClick={handleOnClickLogo}
                        />
                    </Box>
                    <Hidden mdUp implementation="css">
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleMenuOpen}
                            aria-controls={menuId}
                            aria-haspopup="true"
                            size="large">
                            <Box
                                component={MenuIcon}
                                color={theme.palette.white.main}
                                width="2rem!important"
                                height="2rem!important"
                            />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            anchorOrigin={{ vertical: "top", horizontal: "right" }}
                            id={menuId}
                            keepMounted
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                            open={isMenuOpen}
                            onClose={handleMenuClose}
                            classes={{ paper: classes.menuPaper }}
                        >
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                paddingLeft="1.25rem"
                                paddingRight="1.25rem"
                                paddingBottom="1rem"
                                className={classes.outlineNone}
                            >
                                <Box
                                    alt="..."
                                    height="36px"
                                    component="img"
                                    className={classes.headerImg}
                                    src={Logo}
                                />
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={handleMenuClose}
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    size="large">
                                    <Box
                                        component={Clear}
                                        width="2rem!important"
                                        height="2rem!important"
                                    />
                                </IconButton>
                            </Box>
                            <Box
                                component={Divider}
                                marginBottom="1rem!important"
                                marginLeft="1.25rem!important"
                                marginRight="1.25rem!important"
                            />
                            {ListObject}
                        </Menu>
                    </Hidden>
                    <Hidden mdDown implementation="css">
                        {ListObject}
                    </Hidden>
                </Container>
            </Toolbar>
        </AppBar>
    </>;
}
