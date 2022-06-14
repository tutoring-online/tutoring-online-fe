import React from "react";

import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
// import Pagination from '@mui/material/Pagination';

// core components
import componentStyles from "assets/theme/views/admin/tables.js";
import CustomTableHeader from "./CustomTableHeader";
import CustomTableBody from "./CustomTableBody";
import CustomTablePagination from "./CusomTablePagination";
import { isAvailableArray } from "helpers/arrayUtils";

const useStyles = makeStyles(componentStyles);

const Tables = ({
    title,
    columns,
    data
}) => {
    const classes = useStyles();


    return (
        <>
            <Card classes={{ root: classes.cardRoot }}>
                <CardHeader
                    className={classes.cardHeader}
                    title={title || "Tables"}
                    titleTypographyProps={{
                        component: Box,
                        marginBottom: "0!important",
                        variant: "h3",
                    }}
                ></CardHeader>
                <TableContainer>
                    <Box
                        component={Table}
                        alignItems="center"
                        marginBottom="0!important"
                    >
                        <CustomTableHeader
                            columns={columns}
                        />

                        <CustomTableBody />
                    </Box>
                </TableContainer>
                <Box
                    classes={{ root: classes.cardActionsRoot }}
                    component={CardActions}
                    justifyContent="flex-end"
                >
                    <CustomTablePagination
                        count={isAvailableArray(data) ? data.length : 0}
                    />
                </Box>
            </Card>
        </>
    );
};

export default Tables;
