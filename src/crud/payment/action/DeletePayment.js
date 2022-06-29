import React from 'react'
import usePaymentActions from 'hooks/payment/usePaymentActions';
import ConfirmDialog from 'components/Dialog/confirm/ConfirmDialog';
import { toast } from 'react-toastify';

export default function DeletePayment({
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

        actions.deletePayment({ id: payment.id, loading, callback });
    }

    const getDescription = () => (
        <span>
            Are you sure you want to delete <b>{payment?.name}</b> ?
        </span>
    )

    return (
        open &&
        <ConfirmDialog
            open={open}
            title={"Delete payment"}
            description={getDescription()}
            onCancel={handleOnCancelDelete}
            onConfirm={handleOnConfirmDelete}
        />
    )
}
