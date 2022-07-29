import React, { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';

import useCategoryActions from 'hooks/category/useCategoryActions';
import useCategoryDetail from 'hooks/category/useCategoryDetail';

import SwitchStatusDialog from 'components/Dialog/switch-status/SwitchStatusDialog';
import { LIST_CATEGORY_STATUS } from 'settings/category-setting';

export default function EditStatus({
    open,
    handleClose,
    category,
    refresh
}) {
    const isMounted = useRef(true);
    const actions = useCategoryActions();
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const { categoryDetail, loading, refresh: refreshDetail } = useCategoryDetail(category?.id);

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
        if (!category?.id || newStatus == null) {
            toast.warning("Something went wrong.");
            return;
        }

        const loading = (isLoading) => {
            if (isMounted.current === true) {
                setLoadingUpdate(Boolean(isLoading));
            }
        }

        actions.updateCategory({
            id: category?.id,
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
            status={categoryDetail?.status || category?.status}
            listStatus={LIST_CATEGORY_STATUS}
        />
    )
}
