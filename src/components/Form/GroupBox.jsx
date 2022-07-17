import { Box } from '@mui/system'
import React from 'react'

export default function GroupBox({
    children,
    ...props
}) {
    return (
        <Box
            boxShadow="0 1px 2px #c6cfd8"
            padding="0.5rem 1rem"
            borderRadius="6px"
            bgcolor="#fff"
            {...props}
        >
            {children}
        </Box>
    )
}
