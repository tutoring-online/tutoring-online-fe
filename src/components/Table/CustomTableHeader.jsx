import React from 'react'
import { TableCell, TableHead, TableRow } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles';

import { isAvailableArray } from "helpers/arrayUtils";

import componentStyles from "assets/theme/views/admin/tables.js";
const useStyles = makeStyles(componentStyles);

export default function CustomTableHeader({
    columns
}) {
    const classes = useStyles();

    return (
        <TableHead>
            <TableRow>
                {isAvailableArray(columns) && columns.map((column, index) =>
                    <TableCell
                        key={column.key || index}
                        classes={{
                            root:
                                classes.tableCellRoot + " " + classes.tableCellRootHead,
                        }}
                    >
                        {column.label || ""}
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    )
}
