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
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "redux/auth/asyncThunk";
import { ROLES } from "settings/setting";

const useStyles = makeStyles(componentStyles);

function Login() {
    const classes = useStyles();
    const theme = useTheme();
    const actions = useAuthActions();
    const history = useHistory();
    const dispatch = useDispatch();

    const isSignedIn = useSelector(state => state.auth.isSignedIn);
    const user = useSelector(state => state.auth.user);

    console.log(user);

    useEffect(() => {
        const unregisterAuthObserver = auth().onAuthStateChanged(async (currentUser) => {
            if (!currentUser) {
                actions.unsubscribeUser();
                return;
            }

            const token = await currentUser.getIdToken();
            console.log(token);
            
            const userData = {
                ...currentUser.providerData[0],
                role: ROLES.ADMIN,
            }
            actions.subscribeUser(userData);

            //TODO: apply code below when be is ready
            // const action = loginUser({ token, role: null });
            // dispatch(action);
        });

        return () => unregisterAuthObserver();
    }, [actions, dispatch]);

    useEffect(() => {
        if (!isSignedIn) return;
        history.push("/home/index");
    }, [history, isSignedIn])

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
