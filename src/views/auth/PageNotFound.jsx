import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";

// core components
import componentStyles from "assets/theme/views/auth/login.js";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(componentStyles);

const Content = () => {
    const history = useHistory();

    return (
        <div className="page-not-found__content">
            <h1>404</h1>
            <h2>Sorry, Page Not Found</h2>
            <p>The page you are looking for doesn't exist. If you think something is broken, report a problem.</p>
            <div className="page-not-found__panel">
                <Button
                    variant="contained"
                    size="medium"
                    onClick={() => history.push("/index")}
                >
                    Return Home
                </Button>
                <Button
                    variant="contained"
                    size="medium"
                    color="warning"
                >
                    Report Problem
                </Button>
            </div>
        </div>
    )
}

function PageNotFound() {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Grid item xs={12} lg={5} md={7}>
            <Card classes={{ root: classes.cardRoot }}>
                <CardHeader
                    className={classes.cardHeader}
                    title={
                        <Box
                            fontSize="2rem"
                            fontWeight="400"
                            component="small"
                            color={theme.palette.white[600]}
                        >
                            <Content />
                        </Box>
                    }
                    titleTypographyProps={{
                        component: Box,
                        textAlign: "center",
                        marginBottom: "1rem!important",
                        marginTop: ".5rem!important",
                        fontSize: "1rem!important",
                    }}
                ></CardHeader>
            </Card>
        </Grid>
    );
}

export default PageNotFound;
