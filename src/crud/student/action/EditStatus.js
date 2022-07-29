import React, { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';

import useStudentActions from 'hooks/student/useStudentActions';
import useStudentDetail from 'hooks/student/useStudentDetail';

import SwitchStatusDialog from 'components/Dialog/switch-status/SwitchStatusDialog';
import { LIST_STUDENT_STATUS } from 'settings/student-setting';

export default function EditStatus({
    open,
    handleClose,
    student,
    refresh
}) {
    const isMounted = useRef(true);
    const actions = useStudentActions();
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const { studentDetail, loading, refresh: refreshDetail } = useStudentDetail(student?.id);

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
        if (!student?.id || newStatus == null) {
            toast.warning("Something went wrong.");
            return;
        }

        const loading = (isLoading) => {
            if (isMounted.current === true) {
                setLoadingUpdate(Boolean(isLoading));
            }
        }

        actions.updateStudent({
            id: student?.id,
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
            status={studentDetail?.status || student?.status}
            listStatus={LIST_STUDENT_STATUS}
        />
    )
}
