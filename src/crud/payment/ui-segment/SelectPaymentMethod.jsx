import { Box, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles';
import cardComponentStyles from 'assets/theme/components/booking-record-card.js';
import momoImg from "assets/img/images/momo-logo.png";
import { PAYMENT_METHOD } from './ProcessPaymentDialog';
import { MasterCardImage } from 'nta-team/nta-img';
import { useEffect, useRef } from 'react';

const useCardStyles = makeStyles(cardComponentStyles);

const CardWrapper = ({ className, selected, children, ...props }) => {
    console.log(selected);
    return (
        <Box
            className={className}
            component="div"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow={selected ? "rgb(35, 61, 210, 0.6) 0px 0px 0px 3px !important" : "none"}
            sx={{
                transition: "boxShadow 100ms ease",
                cursor: "pointer",
                "&:hover": {
                    boxShadow: "rgb(35, 61, 210, 0.6) 0px 0px 0px 3px"
                }
            }}
            {...props}
        >
            {children}
        </Box>
    )
}

function SelectPaymentMethod({
    title,
    paymentMethod,
    onChange
}) {

    const ref = useRef(null);
    const classes = useCardStyles();

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: "start" });
        }
    }, [paymentMethod]);

    return (
        <Box
            ref={ref}
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
            <Grid item xs={12} sm={6} md={4} >
                <CardWrapper
                    className={classes.root}
                    selected={paymentMethod === PAYMENT_METHOD.MOMO}
                    onClick={() => onChange && onChange(PAYMENT_METHOD.MOMO)}
                >
                    <img
                        src={momoImg}
                        alt="Logo momo"
                        width="80px"
                        height="80px"
                    />
                </CardWrapper>
            </Grid>

            <Grid item xs={12} sm={6} md={4} >
                <CardWrapper
                    className={classes.root}
                    selected={paymentMethod === PAYMENT_METHOD.CREDIT_CARD}
                    onClick={() => onChange && onChange(PAYMENT_METHOD.CREDIT_CARD)}
                >
                    <MasterCardImage width="100px" height="80px" />
                </CardWrapper>
            </Grid>

            <Grid item xs={12} sm={6} md={4} >
                <CardWrapper
                    className={classes.root}
                    fontSize="2rem"
                    selected={paymentMethod === PAYMENT_METHOD.PAY_LATER}
                    onClick={() => onChange && onChange(PAYMENT_METHOD.PAY_LATER)}
                >
                    <Box
                        height="80px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        Pay Later
                    </Box>
                </CardWrapper>
            </Grid>
        </Box>
    )
}

export default SelectPaymentMethod