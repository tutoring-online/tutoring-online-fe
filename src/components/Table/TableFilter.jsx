import React from "react";

// core components
import { Box } from "@mui/system";

const TableFilter = ({ children }) => {

    return (
        <>
            <Box
                width="100%"
            >
                {children}
            </Box>
        </>
    );
};

export default TableFilter;
