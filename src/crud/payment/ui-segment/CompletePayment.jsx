import { Box, Grid } from '@mui/material';
import DelayRenderWrapper from 'nta-team/DelayRenderWrapper';
import React from 'react'
import PayByMomoQrCode from './payment-method/PayByMomoQrCode';
import PayLater from './payment-method/PayLater';
import PaymentByCard from './payment-method/PaymentByCard';
import { PAYMENT_METHOD } from './ProcessPaymentDialog';

function CompletePayment({
    title,
    paymentMethod,
}) {
    return (
        <Box
            component={Grid}
            container
            spacing={2}
        >

            <Grid item xs={12}>
                <Box
                    component="h3"
                    margin="0"
                >
                    {title}
                </Box>
            </Grid>

            <DelayRenderWrapper isRender={paymentMethod === PAYMENT_METHOD.MOMO}>
                <Grid item xs={12}>
                    <PayByMomoQrCode />
                </Grid>
            </DelayRenderWrapper>

            <DelayRenderWrapper isRender={paymentMethod === PAYMENT_METHOD.CREDIT_CARD}>
                <Grid item xs={12}>
                    <PaymentByCard />
                </Grid>
            </DelayRenderWrapper>

            <DelayRenderWrapper isRender={paymentMethod === PAYMENT_METHOD.PAY_LATER}>
                <Grid item xs={12}>
                    <PayLater />
                </Grid>
            </DelayRenderWrapper>
        </Box>
    )
}

export default CompletePayment