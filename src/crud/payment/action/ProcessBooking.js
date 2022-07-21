import React, { useCallback, useEffect, useState } from 'react'
import PaymentDetailDialog from 'crud/payment/ui-segment/PaymentDetailDialog';
import usePaymentActions from 'hooks/payment/usePaymentActions';
import { CRUD_MODE } from 'settings/setting';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getFullPath } from 'route/routes';
import { ROUTES } from 'route/routes';
import { isStudent } from 'settings/setting';
import { toast } from 'react-toastify';
import ProcessPaymentDialog from '../ui-segment/ProcessPaymentDialog';
import { Box } from '@mui/system';
import ReactNumberFormat from 'react-number-format';
import { getPrice } from 'settings/syllabus-setting';
import { PAYMENT_STATUSES } from 'settings/payment-setting';
import CreditCardIcon from '@mui/icons-material/CreditCard';

export default function ProcessBooking({
    open,
    syllabus,
    refresh,
    handleClose,
}) {
    const actions = usePaymentActions();
    const user = useSelector(state => state.auth.user);
    const history = useHistory();

    const [openBooking, setOpenBooking] = useState(false);

    useEffect(() => {
        setOpenBooking(Boolean(open));
    }, [open])

    const [loadingCreate, setLoadingCreate] = useState(false);
    const [bookingData, setBookingData] = useState(null);
    const [openPaymentProcess, setOpenPaymentProcess] = useState(false);

    const loading = useCallback((isLoading) => {
        setLoadingCreate(Boolean(isLoading));
    }, [])

    const listenCreateStatus = useCallback((updateStatus) => {
        if (updateStatus === true) {
            refresh && refresh();
            handleClose && handleClose();
        }
    }, [handleClose, refresh]);

    const handleSubmit = (data) => {

        if (!user) {
            toast.warn("Please login before you can booking a course.");
            history.push(getFullPath(ROUTES.login));
            return;
        }

        if (!isStudent(user?.role)) {
            toast.warn("You cannot do that. Only student can booking a course.");
            return;
        }

        setOpenBooking(false);
        setBookingData(data);
        setOpenPaymentProcess(true);
    }

    const handleCloseProcessPayment = () => {
        toast.info("You could continue complete the payment process in your place.");

        const callback = () => setOpenPaymentProcess(false);
        callCreate(PAYMENT_STATUSES.PENDING, callback);
    }

    const handlePurchaseSuccess = () => {
        const callback = () => setOpenPaymentProcess(false);
        callCreate(PAYMENT_STATUSES.PAID, callback);
    }

    const callCreate = (status, callback) => {
        const fullData = {
            ...bookingData,
            status,
            studentId: user.id,
            syllabusId: syllabus.id,
        }


        actions.createPayment({
            data: [fullData],
            loading,
            callback: (...props) => {
                listenCreateStatus(...props);
                callback && callback();
            }
        });
    }

    return (
        <>
            {
                openBooking &&
                <PaymentDetailDialog
                    open={openBooking}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                    loadingSubmit={loadingCreate}

                    mode={CRUD_MODE.create}
                    syllabus={syllabus}
                    title={"Booking"}
                    submitButton={{
                        text: "Confirm & Checkout"
                    }}
                />
            }

            {openPaymentProcess &&
                <ProcessPaymentDialog
                    open={open}
                    onClose={handleCloseProcessPayment}
                    onSubmit={handlePurchaseSuccess}
                    loadingSubmit={loadingCreate}
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
                                        value={getPrice(syllabus) || 0}
                                        thousandSeparator={true}
                                        suffix=" ₫"
                                    />
                                </Box>
                            </>
                        ),
                        icon: <CreditCardIcon/>
                    }}
                />
            }
        </>
    )
}
