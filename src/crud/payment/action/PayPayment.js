import React, { useEffect, useRef, useState } from 'react'
import usePaymentActions from 'hooks/payment/usePaymentActions';
import { toast } from 'react-toastify';
import { PAYMENT_STATUSES } from 'settings/payment-setting';
import { Box } from '@mui/material';
import ProcessPaymentDialog from '../ui-segment/ProcessPaymentDialog';
import ReactNumberFormat from 'react-number-format';
import { getPrice } from 'settings/syllabus-setting';
import CreditCardIcon from '@mui/icons-material/CreditCard';

export default function PayPayment({
    open,
    handleClose,
    payment,
    refresh
}) {
    const mounted = useRef(false);

    const actions = usePaymentActions();
    const [loadingProcessPay, setLoadingProcessPay] = useState(false);

    useEffect(() => {
        mounted.current = true;
        return () => mounted.current = false;
    }, [])


    const handleCloseProcessPayment = () => {
        handleClose();
    }

    const handlePurchaseSuccess = () => {
        if (!payment?.id) {
            toast.warn("Something went wrong");
            return;
        }

        const data = {
            status: PAYMENT_STATUSES.PAID
        }

        const loading = (isLoading) => {
            if (mounted.current !== true) return;
            setLoadingProcessPay(Boolean(isLoading));
        }

        const callback = (deleteStatue) => {
            if (mounted.current !== true) return;
            if (deleteStatue === true) {
                refresh && refresh();
                handleClose && handleClose();
            }
        }

        actions.updatePayment({
            id: payment.id,
            data,
            loading,
            callback
        });
    }

    return (
        open &&
        <ProcessPaymentDialog
            open={open}
            onClose={handleCloseProcessPayment}
            onSubmit={handlePurchaseSuccess}
            loadingSubmit={loadingProcessPay}
            submitButton={{
                text: (
                    <>
                        <Box
                            fontWeight="600"
                            marginLeft="auto"
                        >
                            {`Pay `}
                            <ReactNumberFormat
                                displayType="text"
                                value={getPrice(payment?.syllabus) || 0}
                                thousandSeparator={true}
                                suffix=" ₫"
                            />
                        </Box>
                    </>
                ),
                icon: <CreditCardIcon/>
            }}
        />
    )
}
