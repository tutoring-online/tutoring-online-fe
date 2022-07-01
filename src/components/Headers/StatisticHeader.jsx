import React from "react";

//Mui
import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Skeleton } from "@mui/material";

//Core Component
import StatisticCard from "components/Cards/StatisticCard";

//Helpers
import { isAvailableArray } from "helpers/arrayUtils";

import componentStyles from "assets/theme/components/header.js";
const useStyles = makeStyles(componentStyles);

const getPercentString = (statistic) => {
    return statistic?.percent != null ? `(${statistic.percent}%)` : "";
}

const StatisticHeader = ({
    statistics,
    loading
}) => {

    const classes = useStyles();

    const getXsSize = () => {
        const MIN_SIZE = 4;
        const size = (12 / statistics.length);
        return size >= MIN_SIZE ? size : MIN_SIZE;
    }

    return (
        isAvailableArray(statistics) &&
        <div className={classes.header}>
            <Container
                maxWidth={false}
                component={Box}
                classes={{ root: classes.containerRoot }}
            >
                <Grid container>
                    {statistics.map(item =>
                        <Grid
                            item
                            xl={getXsSize()}
                            lg={6}
                            xs={12}
                            key={item.key}
                        >
                            <StatisticCard
                                subtitle={
                                    <Box
                                        color={item.textColor}
                                        fontSize="inherit"
                                        fontWeight="inherit"
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <Box
                                            marginRight="8px"
                                            height="14px"
                                            width="14px"
                                            borderRadius="50%"
                                            bgcolor={item.textColor}
                                        >

                                        </Box>
                                        {item.label}
                                    </Box>
                                }
                                title={loading ?
                                    <Skeleton
                                        variant="text"
                                        animation="wave"
                                        height={30}
                                    />
                                    :
                                    <Box
                                        fontSize="inherit"
                                        fontWeight="inherit"
                                        display="flex"
                                        alignItems="center"
                                        color="#525f7f"
                                    >
                                        {item.quantity}
                                        {Boolean(item.percent) &&
                                            <Box
                                                fontSize="inherit"
                                                fontWeight="400"
                                                marginLeft="8px"
                                            >
                                                {getPercentString(item)}
                                            </Box>

                                        }
                                    </Box>
                                }
                                icon={item.icon}
                                color={item.textColor}
                            />
                        </Grid>
                    )}
                </Grid>
            </Container>
        </div>
    );
};

export default StatisticHeader;
