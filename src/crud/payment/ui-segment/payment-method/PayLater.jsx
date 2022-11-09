import { Box } from '@mui/material'
import React from 'react'

function PayLater() {
    return (
        <Box
            component="div"
            height="300px"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Box fontSize="1.5rem" width="100%">
                You can continue your payment later, feel free about it.
            </Box>
        </Box>
    )
}

export default PayLater