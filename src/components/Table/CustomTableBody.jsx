import React from 'react';

// MUI components
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import makeStyles from '@mui/styles/makeStyles';

//Helpers
import { isAvailableArray } from 'helpers/arrayUtils';

import componentStyles from "assets/theme/views/admin/tables.js";
const useStyles = makeStyles(componentStyles);

export default function CustomTableBody({
    columns,
    data,
}) {
    const classes = useStyles();

    return (

        <TableBody>
            {isAvailableArray(data) ?
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
                :
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
            }
        </TableBody>
    )
}