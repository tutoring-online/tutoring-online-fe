import React, { useState } from 'react'
import PaymentDetailDialog from 'crud/payment/ui-segment/PaymentDetailDialog';
import usePaymentActions from 'hooks/payment/usePaymentActions';
import { toast } from 'react-toastify';
import { CRUD_MODE } from 'settings/setting';
import usePaymentDetail from 'hooks/payment/usePaymentDetail';
import { PAYMENT_STATUSES } from 'settings/payment-setting';

export default function ViewPayment({
    open,
    handleClose,
    payment,
    refresh
}) {
    const actions = usePaymentActions();
    const { loading, refresh: refreshDetail } = usePaymentDetail(payment?.id);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    const handleSubmit = (data, onSuccess) => {
        if (!payment?.id || !data) {
            toast.warning("Something went wrong.");
            return;
        }

        const loading = (isLoading) => {
            setLoadingUpdate(Boolean(isLoading));
        }

        const listenUpdateStatus = (updateStatus) => {
            if (updateStatus === true) {
                refresh && refresh();
                onSuccess && onSuccess();
                refreshDetail && refreshDetail();
            }
        }

        actions.updatePayment({ id: payment.id, data, loading, callback: listenUpdateStatus });
    }

    const onAllocateTutor = (data) => {
        if (!data?.tutorId) {
            toast.warning("Something went wrong.");
            return;
        }

        const loading = (isLoading) => {
            setLoadingUpdate(Boolean(isLoading));
        }

        const listenUpdateOnGoingStatus = (updateStatus) => {
            if (updateStatus === true) {
                refresh && refresh();
                refreshDetail && refreshDetail();
                handleClose && handleClose();
            }
        }

        const listenAllocateTutorStatus = (updateStatus) => {
            if (updateStatus === true) {
                refreshDetail && refreshDetail();
                toast.success("Tutor allocation completed.");
                actions.updatePayment({
                    id: payment.id,
                    data: { status: PAYMENT_STATUSES.ONGOING },
                    loading,
                    callback: listenUpdateOnGoingStatus
                });
                return;
            }

            toast.success("Tutor allocation error.");
            actions.updatePayment({
                id: payment.id,
                data: { status: PAYMENT_STATUSES.ERROR },
                loading,
                callback: listenUpdateOnGoingStatus
            });
        }

        actions.updatePayment({ id: payment.id, data, loading, callback: listenAllocateTutorStatus });
    }

    return (
        open &&
        <PaymentDetailDialog
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            onAllocateTutor={onAllocateTutor}
            loadingSubmit={loadingUpdate}
            loadingDetail={loading}

            mode={CRUD_MODE.view}
            payment={payment}
            title="Booking Detail"
            submitButton={{
                text: "Update"
            }}
        />
    )
}
