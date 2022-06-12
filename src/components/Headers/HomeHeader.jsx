import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

// core components
import componentStyles from "assets/theme/components/auth-header.js";
import "./index.scss";

const useStyles = makeStyles(componentStyles);

const HomeHeader = () => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <>
            <Box
                className={`${classes.header} custom-home-header`}
                position="relative"
                paddingTop="8rem"
                paddingBottom="8rem"
            >
                <Container maxWidth="xl">
                    <Box marginBottom="6rem" textAlign="center">

                    </Box>
                </Container>
                <Box
                    position="absolute"
                    zIndex="100"
                    height="70px"
                    top="auto"
                    bottom="0"
                    pointerEvents="none"
                    left="0"
                    right="0"
                    width="100%"
                    overflow="hidden"
                    transform="translateZ(0)"
                >
                    <Box
                        bottom="0"
                        position="absolute"
                        pointerEvents="none"
                        component="svg"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                    >
                        <Box
                            component="polygon"
                            fill={theme.palette.dark.main}
                            points="2560 0 2560 100 0 100"
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default HomeHeader;
