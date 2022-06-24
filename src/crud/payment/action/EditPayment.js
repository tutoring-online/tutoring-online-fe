import React from 'react'
import PaymentDetailDialog from 'crud/payment/ui-segment/PaymentDetailDialog';
import usePaymentActions from 'hooks/payment/usePaymentActions';
import { toast } from 'react-toastify';
import { CRUD_MODE } from 'settings/setting';

export default function EditPayment({
    open,
    handleClose,
    setLoadingInfo,
    payment,
    refresh
}) {
    const actions = usePaymentActions();

    const handleSubmit = (data) => {
        if (!payment?.id || !data) {
            toast.warning("Something went wrong.");
            return;
        }

        const loading = (isLoading) => {
            setLoadingInfo && setLoadingInfo({
                loading: Boolean(isLoading),
                text: isLoading ? "Updating..." : ""
            })
        }

        const callback = (updateStatus) => {
            if (updateStatus === true) {
                handleClose && handleClose();
                refresh && refresh();
            }
        }

        actions.updatePayment({ id: payment.id, data, loading, callback });
    }

    return (
        open &&
        <PaymentDetailDialog
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            payment={payment}
            mode={CRUD_MODE.edit}
            title="Payment Detail"
            submitButton={{
                text: "Update"
            }}
        />
    )
}
