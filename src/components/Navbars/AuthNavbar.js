import React from "react";
import { Link } from "react-router-dom";
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
import AccountCircle from "@mui/icons-material/AccountCircle";
import Clear from "@mui/icons-material/Clear";
import Dashboard from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import Person from "@mui/icons-material/Person";
import VpnKey from "@mui/icons-material/VpnKey";

// core components
import componentStyles from "assets/theme/components/auth-navbar.js";

const useStyles = makeStyles(componentStyles);

export default function AuthNavbar() {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "responsive-menu-id";
  const ListObject = (
    <Box
      display="flex"
      alignItems="center"
      width="auto"
      component={List}
      className={classes.flexDirectionColumn}
    >
      <ListItem
        component={Link}
        to="/admin/dashboard"
        onClick={handleMenuClose}
        classes={{
          root: classes.listItemRoot,
        }}
      >
        <Box
          component={Dashboard}
          width="1.25rem!important"
          height="1.25rem!important"
          marginRight=".5rem!important"
        />
        Dashboard
      </ListItem>
      <ListItem
        component={Link}
        to="/auth/register"
        onClick={handleMenuClose}
        classes={{
          root: classes.listItemRoot,
        }}
      >
        <Box
          component={AccountCircle}
          width="1.25rem!important"
          height="1.25rem!important"
          marginRight=".5rem!important"
        />
        Register
      </ListItem>
      <ListItem
        component={Link}
        to="/auth/login"
        onClick={handleMenuClose}
        classes={{
          root: classes.listItemRoot,
        }}
      >
        <Box
          component={VpnKey}
          width="1.25rem!important"
          height="1.25rem!important"
          marginRight=".5rem!important"
        />
        Login
      </ListItem>
      <ListItem
        component={Link}
        to="/admin/user-profile"
        onClick={handleMenuClose}
        classes={{
          root: classes.listItemRoot,
        }}
      >
        <Box
          component={Person}
          width="1.25rem!important"
          height="1.25rem!important"
          marginRight=".5rem!important"
        />
        Profile
      </ListItem>
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
            alt="..."
            height="30px"
            component="img"
            className={classes.headerImg}
            src={require("assets/img/brand/argon-react-white.png").default}
          />
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
                  src={require("assets/img/brand/argon-react.png").default}
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
