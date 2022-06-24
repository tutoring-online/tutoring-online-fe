import React from 'react'
import StudentDetailDialog from 'crud/student/ui-segment/StudentDetailDialog';
import useStudentActions from 'hooks/student/useStudentActions';
import { toast } from 'react-toastify';
import { CRUD_MODE } from 'settings/setting';

export default function EditStudent({
    open,
    handleClose,
    setLoadingInfo,
    student,
    refresh
}) {
    const actions = useStudentActions();

    const handleSubmit = (data) => {
        if (!student?.id || !data) {
            toast.warning("Something went wrong.");
            return;
        }

        const loading = (isLoading) => {
            setLoadingInfo && setLoadingInfo({
                loading: Boolean(isLoading),
                text: isLoading ? "Updating..." : ""
            })
        }

        const callback = (updateStatus) => {
            if (updateStatus === true) {
                handleClose && handleClose();
                refresh && refresh();
            }
        }

        actions.updateStudent({ id: student.id, data, loading, callback });
    }

    return (
        open &&
        <StudentDetailDialog
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            student={student}
            mode={CRUD_MODE.view}
            title="Student Detail"
            submitButton={{
                text: "Update"
            }}
        />
    )
}
