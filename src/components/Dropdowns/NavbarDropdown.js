import React, { useState } from "react";

//MUI
import makeStyles from '@mui/styles/makeStyles';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Hidden from "@mui/material/Hidden";
import MenuItem from "@mui/material/MenuItem";

// @mui/icons-material components
import LogoutIcon from '@mui/icons-material/Logout';
import EventNote from "@mui/icons-material/EventNote";
import LiveHelp from "@mui/icons-material/LiveHelp";
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// core components
import componentStyles from "assets/theme/components/navbar-dropdown.js";
import { useSelector } from "react-redux";
import { getFullPath } from "route/routes";
import { ROUTES } from "route/routes";
import { useHistory } from "react-router-dom";

import { ClickAwayListener, ListItem, ListItemIcon, ListItemText, Popper } from "@mui/material";
import componentStylesAuth from "assets/theme/components/auth-navbar.js";
import "./index.scss";

const useStyles = makeStyles(componentStyles);
const useStylesAuth = makeStyles(componentStylesAuth);

const menuList = [
    {
        key: "profile",
        icon: Person,
        label: "My Profile",
        path: getFullPath(ROUTES.profile)
    },
    {
        key: "setting",
        icon: Settings,
        label: "Settings",
        path: "#"
    },
    {
        key: "activity",
        icon: EventNote,
        label: "Activity",
        path: "#"
    },
    {
        key: "support",
        icon: LiveHelp,
        label: "Support",
        path: "#"
    },
    {
        key: "logout",
        icon: LogoutIcon,
        label: "Logout",
        path: getFullPath(ROUTES.logout)
    }
]

export default function NavbarDropdown() {
    const classes = useStyles();
    const classesAuth = useStylesAuth();
    const history = useHistory();
    const user = useSelector(state => state.auth.user);

    const [anchorEl, setAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (path) => {
        setAnchorEl(null);
        if (!path) return;
        history.push(path);
    };

    const renderMenu = (
        isMenuOpen &&
        <ClickAwayListener
            onClickAway={handleMenuClose}
        >
            <Popper
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                keepMounted
                sx={{
                    zIndex: 1000,
                    background: "#fff",
                    borderRadius: "4px",
                    overflow: "hidden",
                    padding: "0.5rem 0",
                    minWidth: "260px",
                    boxShadow: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.31) 0px 0px 1px 0px"
                }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    padding="0.25rem 1rem"
                >
                    <Avatar
                        alt="..."
                        src={user?.avatarURL}
                        sx={{
                            width: "40px !important",
                            height: "40px !important",
                            marginRight: "0.5rem"
                        }}
                    />
                    {user?.name}
                </Box>
                <Divider component="div" classes={{ root: classes.dividerRoot }} />
                {menuList.map((item, index) =>
                    <Box
                        key={item.key || index}
                        display="flex!important"
                        alignItems="center!important"
                        component={MenuItem}
                        onClick={() => handleMenuClose(item.path)}
                    >
                        <Box
                            component={item.icon}
                            width="1.25rem!important"
                            height="1.25rem!important"
                            marginRight="1rem"
                        />
                        <span>{item.label}</span>
                    </Box>
                )}
            </Popper>
        </ClickAwayListener>
    );

    return <>
        <Button
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            classes={{
                label: classes.buttonLabel,
                root: classes.buttonRoot,
            }}
            className="navbar-dropdown"
        >
            <ListItem
                classes={{
                    root: classesAuth.listItemRoot,
                }}
                style={{
                    padding: 0
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: "0",
                        color: "#fff",
                        marginRight: ".5rem!important"
                    }}
                >
                    <AccountCircleIcon sx={{ width: "20px", height: "20px" }} />
                </ListItemIcon>

                <Hidden mdDown>
                    <ListItemText
                        primary="User"
                        primaryTypographyProps={{
                            style: { whiteSpace: "nowrap" }
                        }}
                    />
                </Hidden>
            </ListItem>
        </Button>
        {renderMenu}
    </>;
}
