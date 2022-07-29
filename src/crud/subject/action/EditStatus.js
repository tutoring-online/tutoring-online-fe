import React, { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';

import useSubjectActions from 'hooks/subject/useSubjectActions';
import useSubjectDetail from 'hooks/subject/useSubjectDetail';

import SwitchStatusDialog from 'components/Dialog/switch-status/SwitchStatusDialog';
import { LIST_SUBJECT_STATUS } from 'settings/subject-setting';

export default function EditStatus({
    open,
    handleClose,
    subject,
    refresh
}) {
    const isMounted = useRef(true);
    const actions = useSubjectActions();
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const { subjectDetail, loading, refresh: refreshDetail } = useSubjectDetail(subject?.id);

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
        if (!subject?.id || newStatus == null) {
            toast.warning("Something went wrong.");
            return;
        }

        const loading = (isLoading) => {
            if (isMounted.current === true) {
                setLoadingUpdate(Boolean(isLoading));
            }
        }

        actions.updateSubject({
            id: subject?.id,
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
            status={subjectDetail?.status || subject?.status}
            listStatus={LIST_SUBJECT_STATUS}
        />
    )
}
