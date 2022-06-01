import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
// @mui/icons-material components

// core components
import componentStyles from "assets/theme/views/auth/login.js";

// firebase

const useStyles = makeStyles(componentStyles);

function Login() {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <>
            <Grid item xs={12} lg={5} md={7}>
                <Card classes={{ root: classes.cardRoot }}>
                    <CardHeader
                        className={classes.cardHeader}
                        title={
                            <Box
                                fontSize="80%"
                                fontWeight="400"
                                component="small"
                                color={theme.palette.gray[600]}
                            >
                                Sign in with
                            </Box>
                        }
                        titleTypographyProps={{
                            component: Box,
                            textAlign: "center",
                            marginBottom: "1rem!important",
                            marginTop: ".5rem!important",
                            fontSize: "1rem!important",
                        }}
                        subheader={
                            <Box textAlign="center">
                                <Box
                                    component={Button}
                                    width="200px"
                                    variant="contained"
                                    marginRight=".5rem!important"
                                    marginBottom=".3rem!important"
                                    classes={{ root: classes.buttonRoot }}
                                >
                                    <Box component="span" marginRight="4px">
                                        <Box
                                            alt="..."
                                            component="img"
                                            width="20px"
                                            className={classes.buttonImg}
                                            src={
                                                require("assets/img/icons/common/github.svg").default
                                            }
                                        ></Box>
                                    </Box>
                                    <Box component="span" marginLeft=".75rem">
                                        Github
                                    </Box>
                                </Box>
                                <br></br>
                                <Box
                                    component={Button}
                                    width="200px"
                                    variant="contained"
                                    marginRight=".5rem!important"
                                    marginBottom=".3rem!important"
                                    classes={{ root: classes.buttonRoot }}
                                >
                                    <Box component="span" marginRight="4px">
                                        <Box
                                            alt="..."
                                            component="img"
                                            width="20px"
                                            className={classes.buttonImg}
                                            src={
                                                require("assets/img/icons/common/google.svg").default
                                            }
                                        ></Box>
                                    </Box>
                                    <Box component="span" marginLeft=".75rem">
                                        Google
                                    </Box>
                                </Box>
                                <br></br>
                                <Box
                                    component={Button}
                                    width="200px"
                                    variant="contained"
                                    marginRight=".5rem!important"
                                    marginBottom=".3rem!important"
                                    classes={{ root: classes.buttonRoot }}
                                >
                                    <Box component="span" marginRight="4px">
                                        <Box
                                            alt="..."
                                            component="img"
                                            width="20px"
                                            className={classes.buttonImg}
                                            src={
                                                require("assets/img/icons/common/facebook.svg").default
                                            }
                                        ></Box>
                                    </Box>
                                    <Box component="span" marginLeft=".75rem">
                                        Facebook
                                    </Box>
                                </Box>
                                <br></br>
                                <Box
                                    component={Button}
                                    width="200px"
                                    variant="contained"
                                    marginRight=".5rem!important"
                                    marginBottom=".3rem!important"
                                    classes={{ root: classes.buttonRoot }}
                                >
                                    <Box component="span" marginRight="4px">
                                        <Box
                                            alt="..."
                                            component="img"                                            
                                            width="20px"
                                            className={classes.buttonImg}
                                            src={
                                                require("assets/img/icons/common/twitter.svg").default
                                            }
                                        ></Box>
                                    </Box>
                                    <Box component="span" marginLeft=".75rem">
                                        Twitter
                                    </Box>
                                </Box>
                            </Box>
                        }
                    ></CardHeader>
                    <CardContent classes={{ root: classes.cardContent }}>
                    </CardContent>
                </Card>
                <Grid container component={Box} marginTop="1rem">
                    <Grid item xs={6} component={Box} textAlign="left">
                        <a
                            href="#admui"
                            onClick={(e) => e.preventDefault()}
                            className={classes.footerLinks}
                        >
                            Forgot password
                        </a>
                    </Grid>
                    <Grid item xs={6} component={Box} textAlign="right">
                        <a
                            href="#admui"
                            onClick={(e) => e.preventDefault()}
                            className={classes.footerLinks}
                        >
                            Create new account
                        </a>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default Login;
