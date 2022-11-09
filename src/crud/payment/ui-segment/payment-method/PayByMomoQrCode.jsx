import { Box } from '@mui/material'
import React from 'react'
import momoQR from "assets/img/images/momo-qr.jpg";
import { useSelector } from 'react-redux';

function PayByMomoQrCode() {
    const user = useSelector(state => state.auth.user);

    return (
        <Box>
            <Box
                fontStyle="initial"
                fontSize="14px"
            >
                Email: <b>{user?.email}</b>
            </Box>
            <Box
                fontStyle="initial"
                fontSize="14px"
            >
                * After you complete the payment, please wait about 10 minutes, our staff will confirm your order.
            </Box>
            <Box
                component="div"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <img
                    src={momoQR}
                    alt="Momo qr"
                    width="300px"
                    height="300px"
                />
            </Box>
        </Box>
    )
}

export default PayByMomoQrCode