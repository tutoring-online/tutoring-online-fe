import React, { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';

import useAdminActions from 'hooks/admin/useAdminActions';
import useAdminDetail from 'hooks/admin/useAdminDetail';

import SwitchStatusDialog from 'components/Dialog/swicth-status/SwitchStatusDialog';
import { LIST_ADMIN_STATUS } from 'settings/admin-setting';

export default function EditStatus({
    open,
    handleClose,
    admin,
    refresh
}) {
    const isMounted = useRef(true);
    const actions = useAdminActions();
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const { adminDetail, loading, refresh: refreshDetail } = useAdminDetail(admin?.id);

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
        if (!admin?.id || newStatus == null) {
            toast.warning("Something went wrong.");
            return;
        }

        const loading = (isLoading) => {
            if (isMounted.current === true) {
                setLoadingUpdate(Boolean(isLoading));
            }
        }

        actions.updateAdmin({
            id: admin?.id,
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
            status={adminDetail?.status || admin?.status}
            listStatus={LIST_ADMIN_STATUS}
        />
    )
}
