import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';

const message = "Our server is down. From at July 24, 2022, the page just show the UI only.";

export default function Information() {

    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    }

    return (
        !open ? null :
            <Box
                component="div"
                display="flex"
                padding="1rem 1.5rem"

                position="fixed"
                top="2rem"
                left="50%"
                zIndex="10000"

                borderRadius="4px"
                bgcolor="#121212"
                borderBottom="2px solid #c619d2"
                // boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"

                style={{
                    transform: "translateX(-50%)"
                }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="50%"
                    marginLeft="auto"

                    position="absolute"
                    top="0.5rem"
                    right="0.5rem"
                >
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            padding: "5px",
                            transition: "backgroundColor 0.1s ease",
                            ":hover": {
                                background: "rgba(255,255,255,0.15)"
                            }
                        }}
                    >
                        <CloseIcon sx={{ width: 14, height: 14, color: "#fff" }} />
                    </IconButton>
                </Box>

                <Typography
                    fontSize={14}
                    marginRight="2rem"
                    color="#fff"
                    display="flex"
                    alignItems="center"
                    letterSpacing="0.5px"
                >
                    <InfoIcon
                        sx={{
                            color: "#fff",
                            width: 20,
                            height: 20,
                            marginRight: "0.5rem"
                        }}
                    />
                    {message}
                </Typography>

            </Box>
    )
}
