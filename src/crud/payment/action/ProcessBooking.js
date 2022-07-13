import React, { useCallback, useState } from 'react'
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


export default function ProcessBooking({
    open,
    syllabus,
    refresh,
    handleClose,
}) {
    const actions = usePaymentActions();
    const user = useSelector(state => state.auth.user);
    const history = useHistory();

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
        console.log(data);

        if (!user) {
            toast.warn("Please login before you can booking a course.");
            history.push(getFullPath(ROUTES.login));
            return;
        }

        if (!isStudent(user?.role)) {
            toast.warn("You cannot do that. Only student can booking a course.");
            return;
        }

        setBookingData(data);
        setOpenPaymentProcess(true);
    }

    const handleCloseProcessPayment = () => {
        callCreate(PAYMENT_STATUSES.PENDING);
        setOpenPaymentProcess(false);
        toast.info("You could continue complete the payment process in your place.");
    }

    const handlePurchaseSuccess = () => {
        callCreate(PAYMENT_STATUSES.PAID);
        setOpenPaymentProcess(false);
    }

    const callCreate = (status) => {
        const fullData = {
            ...bookingData,
            status,
            studentId: user.id,
            syllabusId: syllabus.id,
        }


        actions.createPayment({
            data: [fullData],
            loading,
            callback: listenCreateStatus
        });
    }

    return (
        <>
            {
                open &&
                <PaymentDetailDialog
                    open={open}
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
                    submitButton={{
                        text: (
                            <>
                                <Box
                                    fontSize="1rem"
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
                        )
                    }}
                />
            }
        </>
    )
}
