import React from 'react'
import usePaymentActions from 'hooks/payment/usePaymentActions';
import ConfirmDialog from 'components/Dialog/confirm/ConfirmDialog';
import { toast } from 'react-toastify';
import { PAYMENT_STATUSES } from 'settings/payment-setting';

export default function CancelPayment({
    open,
    handleClose,
    setLoadingInfo,
    payment,
    refresh
}) {
    const actions = usePaymentActions();

    const handleOnCancelDelete = () => {
        handleClose();
    }

    const handleOnConfirmDelete = () => {
        handleClose && handleClose();
        if (!payment?.id) {
            toast.warn("Something went wrong");
            return;
        }

        if(payment?.status !== PAYMENT_STATUSES.PENDING && payment?.status !== PAYMENT_STATUSES.ERROR) {
            toast.warn("Cannot cancel this booking.");
            return;
        }

        const loading = (isLoading) => {
            setLoadingInfo && setLoadingInfo({
                loading: Boolean(isLoading),
                text: isLoading ? "Deleting..." : ""
            })
        }

        const callback = (deleteStatue) => {
            if (deleteStatue === true) {
                refresh && refresh();
            }
        }

        const data = {
            status: PAYMENT_STATUSES.CANCELED
        }
        actions.updatePayment({ id: payment.id, data , loading, callback });
    }

    const getDescription = () => (
        <span>
            Are you sure you want to cancel this booking?
        </span>
    )

    return (
        open &&
        <ConfirmDialog
            open={open}
            title={"Cancel booking"}
            description={getDescription()}
            onCancel={handleOnCancelDelete}
            onConfirm={handleOnConfirmDelete}
        />
    )
}
