import React from "react";
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
import DirectionsRun from "@mui/icons-material/DirectionsRun";
import EventNote from "@mui/icons-material/EventNote";
import LiveHelp from "@mui/icons-material/LiveHelp";
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";

// core components
import componentStyles from "assets/theme/components/navbar-dropdown.js";
import { useSelector } from "react-redux";

const useStyles = makeStyles(componentStyles);

export default function NavbarDropdown() {
    const classes = useStyles();
    const user = useSelector(state => state.auth.user);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (event) => {
        console.log(event.target.value);
        setAnchorEl(null);
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
                variant="h6"
                component="h6"
                classes={{ root: classes.menuTitle }}
            >
                Welcome!
            </Typography>
            <Box
                display="flex!important"
                alignItems="center!important"
                component={MenuItem}
                onClick={handleMenuClose}
            >
                <Box
                    component={Person}
                    width="1.25rem!important"
                    height="1.25rem!important"
                    marginRight="1rem"
                />
                <span>My profile</span>
            </Box>
            <Box
                display="flex!important"
                alignItems="center!important"
                component={MenuItem}
                onClick={handleMenuClose}
            >
                <Box
                    component={Settings}
                    width="1.25rem!important"
                    height="1.25rem!important"
                    marginRight="1rem"
                />
                <span>Settings</span>
            </Box>
            <Box
                display="flex!important"
                alignItems="center!important"
                component={MenuItem}
                onClick={handleMenuClose}
            >
                <Box
                    component={EventNote}
                    width="1.25rem!important"
                    height="1.25rem!important"
                    marginRight="1rem"
                />
                <span>Activity</span>
            </Box>
            <Box
                display="flex!important"
                alignItems="center!important"
                component={MenuItem}
                onClick={handleMenuClose}
            >
                <Box
                    component={LiveHelp}
                    width="1.25rem!important"
                    height="1.25rem!important"
                    marginRight="1rem"
                />
                <span>Support</span>
            </Box>
            <Divider component="div" classes={{ root: classes.dividerRoot }} />
            <Box
                display="flex!important"
                alignItems="center!important"
                component={MenuItem}
                onClick={handleMenuClose}
            >
                <Box
                    component={DirectionsRun}
                    width="1.25rem!important"
                    height="1.25rem!important"
                    marginRight="1rem"
                />
                <span>Logout</span>
            </Box>
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
            style={{
                display: "flex",
                alignItems: "center",
                color: "#fff"
            }}
        >
            <Avatar
                alt="..."
                src={user?.photoURL}
                classes={{
                    root: classes.avatarRoot,
                }}
            />
            <Hidden mdDown>{user?.displayName || ""}</Hidden>
        </Button>
        {renderMenu}
    </>;
}
