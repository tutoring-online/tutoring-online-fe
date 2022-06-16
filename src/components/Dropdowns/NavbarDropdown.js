import React, { useState } from "react";

//MUI
import makeStyles from '@mui/styles/makeStyles';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Hidden from "@mui/material/Hidden";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
// @mui/icons-material components
import LogoutIcon from '@mui/icons-material/Logout';
import EventNote from "@mui/icons-material/EventNote";
import LiveHelp from "@mui/icons-material/LiveHelp";
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";

// core components
import componentStyles from "assets/theme/components/navbar-dropdown.js";
import { useSelector } from "react-redux";
import { getFullPath } from "route/routes";
import { ROUTES } from "route/routes";
import { useHistory } from "react-router-dom";

import "./index.scss";
const useStyles = makeStyles(componentStyles);

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

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Typography
                variant="h5"
                component="h5"
                classes={{ root: classes.menuTitle }}
            >
                {`Hi, ${user?.name}`}
            </Typography>
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
        </Menu>
    );

    return <>
        <Button
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            classes={{
                label: classes.buttonLabel,
                root: classes.buttonRoot,
            }}
            className="navbar-dropdown"
        >
            <Avatar
                alt="..."
                src={user?.avatarURL}
                classes={{
                    root: classes.avatarRoot,
                }}
            />
            <Hidden mdDown>{user?.name || ""}</Hidden>
        </Button>
        {renderMenu}
    </>;
}
