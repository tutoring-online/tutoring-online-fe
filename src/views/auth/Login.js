import React, { useEffect } from "react";
import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";

// core components
import componentStyles from "assets/theme/views/auth/login.js";
import { StyledFirebaseAuth } from "react-firebaseui";
import uiConfig from "firebase-config/firebase-ui";
import { auth } from "firebase-config/firebase";
import useAuthActions from "hooks/useAuthActions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(componentStyles);

function Login() {
    const classes = useStyles();
    const theme = useTheme();
    const actions = useAuthActions();
    const history = useHistory();

    useEffect(() => {
        const unregisterAuthObserver = auth().onAuthStateChanged(async (user) => {
            if(!user) {
                actions.unsubscribeUser();
                return;
            }

            //Refresh token if needed
            const token = await user.getIdToken();
            actions.subscribeUser(user.providerData[0]);

            console.log(token);

            history.push("/admin/user-profile");
        });

        return () => unregisterAuthObserver();
    }, [actions, history]);


    return (
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
                        <StyledFirebaseAuth
                            uiConfig={uiConfig}
                            firebaseAuth={auth()}
                        />
                    }
                ></CardHeader>
            </Card>
        </Grid>
    );
}

export default Login;
