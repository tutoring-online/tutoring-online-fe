import React from 'react';
import { Box } from '@mui/material';

export default function ViewMode({
    payment
}) {
    return (
        <Box component="div">
            {payment?.price}
        </Box>
    );
}
