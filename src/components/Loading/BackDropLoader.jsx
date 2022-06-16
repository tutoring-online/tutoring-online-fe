import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';

export default function BackDropLoader({
    open,
    text
}) {

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            {text &&
                <Box
                    component="h1"
                    fontSize="2rem"
                    color="#fff"
                    fontWeight="500"
                    marginRight="8px"
                    textAlign="center"

                >
                    {text}
                </Box>
            }
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}
