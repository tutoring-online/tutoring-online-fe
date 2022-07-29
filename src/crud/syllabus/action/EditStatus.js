import React, { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';

import useSyllabusActions from 'hooks/syllabus/useSyllabusActions';
import useSyllabusDetail from 'hooks/syllabus/useSyllabusDetail';

import SwitchStatusDialog from 'components/Dialog/switch-status/SwitchStatusDialog';
import { LIST_SYLLABUS_STATUS } from 'settings/syllabus-setting';

export default function EditStatus({
    open,
    handleClose,
    syllabus,
    refresh
}) {
    const isMounted = useRef(true);
    const actions = useSyllabusActions();
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const { syllabusDetail, loading, refresh: refreshDetail } = useSyllabusDetail(syllabus?.id);

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
        if (!syllabus?.id || newStatus == null) {
            toast.warning("Something went wrong.");
            return;
        }

        const loading = (isLoading) => {
            if (isMounted.current === true) {
                setLoadingUpdate(Boolean(isLoading));
            }
        }

        actions.updateSyllabus({
            id: syllabus?.id,
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
            status={syllabusDetail?.status || syllabus?.status}
            listStatus={LIST_SYLLABUS_STATUS}
        />
    )
}
