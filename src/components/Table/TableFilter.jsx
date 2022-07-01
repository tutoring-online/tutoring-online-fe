import React from "react";

// core components
import { Box } from "@mui/system";

const TableFilter = ({ children }) => {

    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                flexWrap="wrap"
                gap="0.5rem"
                width="100%"
                marginBottom="2rem"
                padding="1rem"
                margin="0"
            >
                {children}
            </Box>
        </>
    );
};

export default TableFilter;
