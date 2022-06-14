import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

const DEFAULT_PAGINATION = {
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 25, 50]
}

export default function CustomTablePagination({
    count,
}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_PAGINATION.rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TablePagination
            component="div"
            count={count || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={DEFAULT_PAGINATION.rowsPerPageOptions}
        />
    );
}
