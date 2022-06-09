import React from "react";

import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

// core components
import componentStyles from "assets/theme/components/user-header.js";

const useStyles = makeStyles(componentStyles);

const UserHeader = () => {
  const classes = useStyles();
  return (
    <>
      <Box
        paddingTop="3rem"
        paddingBottom="8rem"
        alignItems="center"
        display="flex"
        className={classes.wrapperBox}
        minHeight="200px"
        position="relative"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          className={classes.overlayBox}
        />
        <Container
          display="flex"
          alignItems="center"
          maxWidth={false}
          component={Box}
          classes={{ root: classes.containerRoot }}
        >          
        </Container>
      </Box>
    </>
  );
};

export default UserHeader;
