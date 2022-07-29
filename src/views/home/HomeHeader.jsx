import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";

// core components
import componentStyles from "assets/theme/components/auth-header.js";
import "./index.scss";

const useStyles = makeStyles(componentStyles);

const HomeHeader = () => {
    const classes = useStyles();

    return (
        <>
            <Box
                className={classes.header}
                paddingTop="8rem"
                paddingBottom="8rem"
            >
                <Box
                    marginBottom="4rem"
                    height="380px"
                >
                </Box>
            </Box>
        </>
    );
};

export default HomeHeader;
