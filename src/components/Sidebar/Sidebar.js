import React from "react";
import PropTypes from "prop-types";
import { useLocation, Link } from "react-router-dom";
import makeStyles from '@mui/styles/makeStyles';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Hidden from "@mui/material/Hidden";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// @mui/icons-material components
import Clear from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";

// core components
import componentStyles from "assets/theme/components/sidebar.js";

const useStyles = makeStyles(componentStyles);

const getLogoImage = (logo, classes) => (
    <img alt={logo.imgAlt} className={classes.logoClasses} src={logo.imgSrc} />
);

const getLogoObject = (logo, classes) => (
    logo && logo.innerLink ? (
        <Link to={logo.innerLink} className={classes.logoLinkClasses}>
            {getLogoImage(logo, classes)}
        </Link>
    ) : logo && logo.outterLink ? (
        <a href={logo.outterLink} className={classes.logoLinkClasses}>
            {getLogoImage(logo, classes)}
        </a>
    ) : null
)

function renderTextContent(route, classes) {
    return (
        <>
            <Box minWidth="2.25rem" display="flex" alignItems="center">
                {typeof route.icon === "string" ? (
                    <Box
                        component="i"
                        className={route.icon + " " + classes["text" + route.iconColor]}
                    />
                ) : null}
                {typeof route.icon === "object" ? (
                    <Box
                        component={route.icon}
                        width="1.25rem!important"
                        height="1.25rem!important"
                        className={classes["text" + route.iconColor]}
                    />
                ) : null}
            </Box>
            {route.name}
        </>
    );
}

const HrefListItem = ({ route, onClick, classes, selected }) => (
    <ListItem
        component={"a"}
        href={route.href}
        onClick={onClick}
        classes={{
            root:
                classes.listItemRoot +
                (route.upgradeToPro
                    ? " " + classes.listItemRootUpgradeToPro
                    : ""),
            selected: classes.listItemSelected,
        }}
        target="_blank"
        selected={selected}
    >
        {renderTextContent(route, classes)};
    </ListItem>
);

const LinkListItem = ({ route, onClick, classes, selected }) => (
    <ListItem
        component={Link}
        onClick={onClick}
        to={route.layout + route.path}
        classes={{
            root:
                classes.listItemRoot +
                (route.upgradeToPro
                    ? " " + classes.listItemRootUpgradeToPro
                    : ""),
            selected: classes.listItemSelected,
        }}
        selected={selected}
    >
        {renderTextContent(route, classes)}
    </ListItem>
);

const menuId = "responsive-menu-id";

export default function Sidebar({ routes, logo, dropdown, input }) {
    const classes = useStyles();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = React.useState(null);


    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const createLinks = (routes) => {
        return routes.map((route, index) => {
            if (route.divider) {
                return <Divider key={route.key || index} classes={{ root: classes.divider }} />;
            }

            if (route.title) {
                return (
                    <Typography
                        key={route.key || index}
                        variant="h6"
                        component="h6"
                        classes={{ root: classes.title }}
                    >
                        {route.title}
                    </Typography>
                );
            }

            const item = {
                key: route.key || index,
                Component: route.href ? HrefListItem : LinkListItem,
                props: {
                    route: route,
                    classes: classes,
                    onClick: handleMenuClose,
                    selected: (
                        location.pathname === route.layout + route.path ||
                        route.upgradeToPro === true
                    )
                }
            }

            return (
                <item.Component
                    key={item.key}
                    {...item.props}
                />
            )
        });
    };

    return <>
        <Hidden mdDown implementation="css">
            <Drawer variant="permanent" anchor="left" open>
                <Box paddingBottom="1rem">{getLogoObject(logo, classes)}</Box>
                <List classes={{ root: classes.listRoot }}>
                    {createLinks(routes)}
                </List>
            </Drawer>
        </Hidden>
        <Hidden mdUp implementation="css">
            <AppBar position="relative" color="default" elevation={0}>
                <Toolbar>
                    <Container
                        display="flex!important"
                        justifyContent="space-between"
                        alignItems="center"
                        marginTop=".75rem"
                        marginBottom=".75rem"
                        component={Box}
                        maxWidth={false}
                        padding="0!important"
                    >
                        <Box
                            component={MenuIcon}
                            width="2rem!important"
                            height="2rem!important"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleMenuOpen}
                        />
                        {getLogoObject(logo, classes)}
                        {dropdown}
                    </Container>
                </Toolbar>
            </AppBar>
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
                    {getLogoObject(logo, classes)}
                    <Box
                        component={Clear}
                        width="2rem!important"
                        height="2rem!important"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleMenuClose}
                    />
                </Box>
                <Box
                    component={Divider}
                    marginBottom="1rem!important"
                    marginLeft="1.25rem!important"
                    marginRight="1.25rem!important"
                />
                <Box paddingLeft="1.25rem" paddingRight="1.25rem">
                    {input}
                </Box>
                <List classes={{ root: classes.listRoot }}>
                    {createLinks(routes)}
                </List>
            </Menu>
        </Hidden>
    </>;
}

Sidebar.defaultProps = {
    routes: [],
};

Sidebar.propTypes = {
    // this is the input/component that will be rendered on responsive
    // in our demo, we add this input component since the AdminNavbar
    // will not be visible on responsive mode
    input: PropTypes.node,
    // this is the dropdown/component that will be rendered on responsive
    // in our demo, it is the same with the dropdown from the AdminNavbar
    // since the AdminNavbar will not be visible on responsive mode
    dropdown: PropTypes.node,
    // NOTE: we recommend that your logo has the following dimensions
    // // 135x40 or 487x144 or a resize of these dimensions
    logo: PropTypes.shape({
        // innerLink is for links that will direct the user within the app
        // it will be rendered as <Link to="...">...</Link> tag
        innerLink: PropTypes.string,
        // outterLink is for links that will direct the user outside the app
        // it will be rendered as simple <a href="...">...</a> tag
        outterLink: PropTypes.string,
        // the image src of the logo
        imgSrc: PropTypes.string.isRequired,
        // the alt for the img
        imgAlt: PropTypes.string.isRequired,
    }),
    // links that will be displayed inside the component
    routes: PropTypes.arrayOf(
        PropTypes.oneOfType([
            // this generates an anchor (<a href="href">..</a>) link
            // this is a link that is sent outside the app
            PropTypes.shape({
                // if this is set to true, than the link will have an absolute position
                // use wisely and with precaution
                upgradeToPro: PropTypes.bool,
                href: PropTypes.string,
                name: PropTypes.string,
                icon: PropTypes.oneOfType([
                    // this refers to icons such as ni ni-spaceship or fa fa-heart
                    PropTypes.string,
                    // this refers to icons from @mui/icons-material
                    PropTypes.object,
                ]),
                iconColor: PropTypes.oneOf([
                    "Primary",
                    "PrimaryLight",
                    "Error",
                    "ErrorLight",
                    "Warning",
                    "WarningLight",
                    "Info",
                    "InfoLight",
                ]),
            }),
            // this generates a Link (<Link to="layout + path">..</Link>) link
            // this is a link that is sent inside the app
            PropTypes.shape({
                path: PropTypes.string,
                name: PropTypes.string,
                layout: PropTypes.string,
                component: PropTypes.func,
                icon: PropTypes.oneOfType([
                    // this refers to icons such as ni ni-spaceship or fa fa-heart
                    PropTypes.string,
                    // this refers to icons from @mui/icons-material
                    PropTypes.object,
                ]),
                iconColor: PropTypes.oneOf([
                    "Primary",
                    "PrimaryLight",
                    "Error",
                    "ErrorLight",
                    "Warning",
                    "WarningLight",
                    "Info",
                    "InfoLight",
                ]),
            }),
            // this is just a title without any action on it
            // you can think of it as a disabled link
            PropTypes.shape({
                title: PropTypes.string,
            }),
            // this is just a divider line
            PropTypes.shape({
                divider: true,
            }),
        ])
    ),
};
