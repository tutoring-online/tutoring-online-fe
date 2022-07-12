import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import { GoogleAuthProvider } from "firebase/auth";

// core components
import componentStyles from "assets/theme/views/auth/login.js";
import { auth } from "firebase-config/firebase";

const useStyles = makeStyles(componentStyles);
const provider = new GoogleAuthProvider();

function SignUp() {
    const classes = useStyles();
    const theme = useTheme();

    const handleSignUp = () => {
        auth().signInWithPopup(provider);
    }


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
                                Sign up with
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
                            <div className="google">
                                <button
                                    className="google__button"
                                    type="button"
                                    onClick={handleSignUp}
                                >
                                    <span className="google__icon"></span>
                                    <span className="google__text">Sign up with Google</span>
                                </button>
                            </div>
                        }
                    ></CardHeader>
                </Card>

            </Grid>
        </>
    );
}

export default SignUp;
