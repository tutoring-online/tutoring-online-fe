import React, { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';

import usePaymentActions from 'hooks/payment/usePaymentActions';
import usePaymentDetail from 'hooks/payment/usePaymentDetail';

import SwitchStatusDialog from 'components/Dialog/switch-status/SwitchStatusDialog';
import { LIST_PAYMENT_STATUS } from 'settings/payment-setting';

export default function EditStatus({
    open,
    handleClose,
    payment,
    refresh
}) {
    const isMounted = useRef(true);
    const actions = usePaymentActions();
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const { paymentDetail, loading, refresh: refreshDetail } = usePaymentDetail(payment?.id);

    useEffect(() => {
        return () => isMounted.current = false;
    }, [])


    const listenUpdateStatus = useCallback((updateStatus) => {
        if (updateStatus === true) {
            refresh && refresh();
            refreshDetail && refreshDetail();
            handleClose && handleClose();
        }
    }, [handleClose, refresh, refreshDetail]);

    const handleSubmit = (newStatus) => {
        if (!payment?.id || newStatus == null) {
            toast.warning("Something went wrong.");
            return;
        }

        const loading = (isLoading) => {
            if (isMounted.current === true) {
                setLoadingUpdate(Boolean(isLoading));
            }
        }

        actions.updatePayment({
            id: payment?.id,
            data: { status: newStatus },
            loading,
            callback: listenUpdateStatus
        });
    }

    return (
        open &&
        <SwitchStatusDialog
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            loadingSubmit={loadingUpdate}
            loadingDetail={loading}

            title="Status settings"
            status={paymentDetail?.status || payment?.status}
            listStatus={LIST_PAYMENT_STATUS}
        />
    )
}
