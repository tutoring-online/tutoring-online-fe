import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";

// core components
import componentStyles from "assets/theme/components/auth-header.js";
import "./index.scss";
import SearchBox from "./SearchBox";

const useStyles = makeStyles(componentStyles);

const HomeHeader = () => {
    const classes = useStyles();

    return (
        <>
            <Box
                className={`${classes.header} custom-home-header`}
                position="relative"
                paddingTop="8rem"
                paddingBottom="8rem"
            >
                <Box marginBottom="4rem">
                    <SearchBox/>
                </Box>
            </Box>
        </>
    );
};

export default HomeHeader;
