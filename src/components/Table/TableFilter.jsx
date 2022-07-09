import React from "react";

// core components
import { Box } from "@mui/system";

const TableFilter = ({ children }) => {

    return (
        <>
            <Box
                width="100%"
                padding="0 24px"
            >
                {children}
            </Box>
        </>
    );
};

export default TableFilter;
