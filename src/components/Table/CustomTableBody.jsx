import React from 'react';

// MUI components
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import makeStyles from '@mui/styles/makeStyles';
import { Skeleton } from '@mui/material';

//Helpers
import { isAvailableArray } from 'helpers/arrayUtils';

import componentStyles from "assets/theme/views/admin/tables.js";

const useStyles = makeStyles(componentStyles);

const NoRow = ({ classes }) => (
    <TableRow>
        <TableCell
            classes={{ root: classes.tableCellRoot }}
            style={{
                borderBottom: "none",
                fontSize: "14px",
                fontStyle: "italic"
            }}
        >
            No information
        </TableCell>
    </TableRow>
)

const TableRowSkeleton = ({ classes, columns }) => (
    <TableRow>
        {isAvailableArray(columns) && columns.map((column, index) =>
            <TableCell
                key={column.key || index}
                align={column.align || "left"}
                classes={{ root: classes.tableCellRoot }}
            >
                <Skeleton
                    variant="text"
                    animation="wave"
                    height={20}
                />
            </TableCell>
        )}
    </TableRow>
)

export default function CustomTableBody({
    columns,
    data,
    loadingData
}) {
    const classes = useStyles();

    const renderData = () => (
        data.map((row, index) =>
            <TableRow
                key={index}
            >
                {isAvailableArray(columns) && columns.map((column, index) =>
                    <TableCell
                        key={column.key || index}
                        align={column.align || "left"}
                        classes={{ root: classes.tableCellRoot }}
                    >
                        {column.render ? column.render(row) : (row[column.key] || "N/A")}
                    </TableCell>
                )}
            </TableRow>
        )
    )

    const renderContent = () => isAvailableArray(data) ? renderData() : <NoRow classes={classes} />;
    const renderSkeleton = () => (
        <>
            <TableRowSkeleton classes={classes} columns={columns} />
            <TableRowSkeleton classes={classes} columns={columns} />
            <TableRowSkeleton classes={classes} columns={columns} />
            <TableRowSkeleton classes={classes} columns={columns} />
            <TableRowSkeleton classes={classes} columns={columns} />
        </>
    )
    return (

        <TableBody>
            {loadingData ? renderSkeleton() : renderContent()}
        </TableBody>
    )
}