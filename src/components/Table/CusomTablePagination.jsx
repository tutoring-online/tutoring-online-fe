import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { DEFAULT_PAGINATION } from 'settings/table-setting';

export default function CustomTablePagination({
    count,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    rowsPerPageOptions
}) {
    
    return (
        <TablePagination
            component="div"
            count={count || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage || DEFAULT_PAGINATION.rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions || DEFAULT_PAGINATION.rowsPerPageOptions}
        />
    );
}
