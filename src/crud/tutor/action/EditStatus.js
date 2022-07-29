import React, { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';

import useTutorActions from 'hooks/tutor/useTutorActions';
import useTutorDetail from 'hooks/tutor/useTutorDetail';

import SwitchStatusDialog from 'components/Dialog/switch-status/SwitchStatusDialog';
import { LIST_TUTOR_STATUS } from 'settings/tutor-setting';

export default function EditStatus({
    open,
    handleClose,
    tutor,
    refresh
}) {
    const isMounted = useRef(true);
    const actions = useTutorActions();
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const { tutorDetail, loading, refresh: refreshDetail } = useTutorDetail(tutor?.id);

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
        if (!tutor?.id || newStatus == null) {
            toast.warning("Something went wrong.");
            return;
        }

        const loading = (isLoading) => {
            if (isMounted.current === true) {
                setLoadingUpdate(Boolean(isLoading));
            }
        }

        actions.updateTutor({
            id: tutor?.id,
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
            status={tutorDetail?.status || tutor?.status}
            listStatus={LIST_TUTOR_STATUS}
        />
    )
}
