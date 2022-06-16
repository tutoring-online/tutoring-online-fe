import React, { useEffect, useState } from "react";

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
import { DEFAULT_PAGINATION } from "settings/table-setting";

const useStyles = makeStyles(componentStyles);

const Tables = ({
    title,
    columns,
    data,
    panel
}) => {
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_PAGINATION.rowsPerPage);

    const [paginationData, setPaginationData] = useState([]);

    useEffect(() => {
        const startIndex = page * rowsPerPage;
        const endIndex = (page + 1) * rowsPerPage;
        setPaginationData(() => {
            if (!isAvailableArray(data)) return [];

            return data.slice(startIndex, endIndex);
        });
    }, [data, page, rowsPerPage])


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
                    action={panel}
                />
                <TableContainer>
                    <Box
                        component={Table}
                        alignItems="center"
                        marginBottom="0!important"
                    >
                        <CustomTableHeader
                            columns={columns}
                        />

                        <CustomTableBody
                            columns={columns}
                            data={paginationData}
                        />
                    </Box>
                </TableContainer>
                <Box
                    classes={{ root: classes.cardActionsRoot }}
                    component={CardActions}
                    justifyContent="flex-end"
                >
                    <CustomTablePagination
                        count={isAvailableArray(data) ? data.length : 0}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Box>
            </Card>
        </>
    );
};

export default Tables;
