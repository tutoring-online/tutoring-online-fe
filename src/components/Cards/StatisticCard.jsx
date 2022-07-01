import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// core components
import componentStyles from "assets/theme/components/card-stats.js";
import boxShadows from "assets/theme/box-shadow.js";

const useStyles = makeStyles(componentStyles);

function StatisticCard({
    subtitle,
    title,
    icon,
    color,
}) {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <>
            <Card classes={{ root: classes.cardRoot }} elevation={0}>
                <CardContent classes={{ root: classes.cardContentRoot }}>
                    <Grid container component={Box} justifyContent="space-between">
                        <Grid item sx={{ flexGrow: 1 }}>
                            <Box
                                component={Typography}
                                variant="h5"
                                marginBottom="0!important"
                                marginTop="0!important"
                                className={classes.textUppercase}
                            >
                                {subtitle}
                            </Box>
                            <Box
                                component={Typography}
                                variant="h2"
                                fontWeight="500!important"
                                marginBottom="0!important"
                                marginTop="0!important"
                            >
                                {title}
                            </Box>
                        </Grid>
                        <Grid item xs={"auto"}>
                            <Box
                                width="3rem"
                                height="3rem"
                                padding="12px"
                                textAlign="center"
                                display="inline-flex"
                                alignItems="center"
                                justifyContent="center"
                                borderRadius="50%"
                                boxShadow={boxShadows.boxShadow}
                                color={theme.palette.white.main}
                                bgcolor={color}
                            >
                                {icon && typeof icon === "object" ? (
                                    <Box
                                        component={icon}
                                        width="1.5rem!important"
                                        height="1.5rem!important"
                                    />
                                ) : null}
                                {icon && typeof icon === "string" ? (
                                    <Box component="i" fontSize="1.25rem" className={icon} />
                                ) : null}
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}

export default StatisticCard;
