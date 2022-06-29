import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

export default function ViewMode({ subject }) {
    return (
        <Box component="div">
            <Grid container paddingLeft="4rem">
                <Grid item xs={12} lg={6} marginBottom="20px">
                    <Typography fontSize={18} fontWeight="bold">
                        Name:
                    </Typography>
                    <Typography>{subject?.name || "N/A"}</Typography>
                </Grid>
                <Grid item xs={12} lg={6} marginBottom="20px">
                    <Typography fontSize={18} fontWeight="bold">
                        Status:
                    </Typography>
                    <Typography>DKJGDL:GKJDLKGJSDLFGKJDFGLKJ</Typography>
                </Grid>
                <Grid item xs={12} lg={12} marginBottom="20px">
                    <Typography fontSize={18} fontWeight="bold">
                        Description:
                    </Typography>
                    <Typography>SDFHSKFJSDKLFJSLDKFJ</Typography>
                </Grid>
            </Grid>
        </Box>
    );
}
