import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

export default function ViewMode({ syllabus }) {
    return (
        <Box component="div">
            <Grid container paddingLeft="4rem">
                <Grid item xs={12} lg={6} marginBottom="20px">
                    <Typography fontSize={18} fontWeight="bold">
                        Status:
                    </Typography>
                    <Typography>{syllabus?.status || "N/A"}</Typography>
                </Grid>
                <Grid item xs={12} lg={6} marginBottom="20px">
                    <Typography fontSize={18} fontWeight="bold">
                        Description:
                    </Typography>
                    <Typography>{syllabus?.description || "N/A"}</Typography>
                </Grid>
            </Grid>
        </Box>
    );
}
