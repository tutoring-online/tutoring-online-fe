import React from "react";

// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// @mui/icons-material components

// core components
import Header from "components/Headers/Header.js";

import {
    chartOptions,
    parseOptions,
} from "variables/charts.js";


import componentStyles from "assets/theme/views/admin/dashboard.js";
import Payment from "./basic-table/Payment";
import Student from "./basic-table/Student";
import Syllabus from "./basic-table/Syllabus";
import Tutor from "./basic-table/Tutor";
const useStyles = makeStyles(componentStyles);


function Dashboard() {
    const classes = useStyles();

    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }

    return (
        <>
            <Header />

            <Container
                maxWidth={false}
                component={Box}
                marginTop="-8.5rem"
                classes={{ root: classes.containerRoot }}
            >
                <Grid container spacing={2} >
                    <Grid item xs={12} lg={6}>
                        <Grid container spacing={2} rowSpacing={4}>
                            <Grid item xs={12}><Payment /></Grid>
                            <Grid item xs={12}><Student /></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Grid container spacing={2} rowSpacing={4}>
                            <Grid item xs={12}><Syllabus /></Grid>
                            <Grid item xs={12}><Tutor /></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default Dashboard;
