import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// @mui/icons-material components
import SearchIcon from "@mui/icons-material/Search";

// core components
import NavbarDropdown from "components/Dropdowns/NavbarDropdown.js";

import componentStyles from "assets/theme/components/admin-navbar.js";

const useStyles = makeStyles(componentStyles);

export default function AdminNavbar({ brandText }) {
  const classes = useStyles();
  return (
    <>
      <AppBar
        position="absolute"
        color="transparent"
        elevation={0}
        classes={{ root: classes.appBarRoot }}
      >
        <Toolbar disableGutters>
          <Container
            maxWidth={false}
            component={Box}
            classes={{ root: classes.containerRoot }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              marginTop="0.5rem"
            >
              <div>
                <Typography
                  className={classes.brandTitle}
                  variant="h4"
                  component="a"
                >
                  {brandText}
                </Typography>
              </div>
              <Box display="flex" alignItems="center" width="auto">
                <Box
                  display="flex"
                  alignItems="center"
                  width="auto"
                  marginRight="1rem"
                  classes={{
                    root: classes.searchBox,
                  }}
                >
                  <SearchIcon className={classes.searchIcon} />
                  <InputBase
                    placeholder="Search"
                    classes={{
                      input: classes.searchInput,
                    }}
                  />
                </Box>
                <NavbarDropdown />
              </Box>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
