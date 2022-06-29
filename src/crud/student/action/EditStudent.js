import React, { useState } from 'react'
import StudentDetailDialog from 'crud/student/ui-segment/StudentDetailDialog';
import useStudentActions from 'hooks/student/useStudentActions';
import useStudentDetail from 'hooks/student/useStudentDetail';
import { toast } from 'react-toastify';
import { CRUD_MODE } from 'settings/setting';

export default function EditStudent({
    open,
    handleClose,
    student,
    refresh
}) {
    const actions = useStudentActions();
    const { studentDetail, loading, refresh: refreshDetail } = useStudentDetail(student?.id);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    const handleSubmit = (data, onSuccess) => {
        if (!student?.id || !data) {
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

        actions.updateStudent({ id: student.id, data, loading, callback: listenUpdateStatus });
    }

    return (
        open &&
        <StudentDetailDialog
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            loadingSubmit={loadingUpdate}
            loadingDetail={loading}

            mode={CRUD_MODE.edit}
            student={studentDetail || student}
            title="Student Detail"
            submitButton={{
                text: "Update"
            }}
        />
    )
}
