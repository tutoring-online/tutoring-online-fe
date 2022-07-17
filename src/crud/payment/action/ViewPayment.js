import React, { useState } from 'react'
import PaymentDetailDialog from 'crud/payment/ui-segment/PaymentDetailDialog';
import usePaymentActions from 'hooks/payment/usePaymentActions';
import { toast } from 'react-toastify';
import { CRUD_MODE } from 'settings/setting';
import usePaymentDetail from 'hooks/payment/usePaymentDetail';

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

    return (
        open &&
        <PaymentDetailDialog
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
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
