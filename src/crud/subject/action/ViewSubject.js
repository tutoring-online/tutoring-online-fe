import React, { useState } from 'react'
import SubjectDetailDialog from 'crud/subject/ui-segment/SubjectDetailDialog';
import useSubjectActions from 'hooks/subject/useSubjectActions';
import useSubjectDetail from 'hooks/subject/useSubjectDetail';
import { toast } from 'react-toastify';
import { CRUD_MODE } from 'settings/setting';

export default function ViewSubject({
    open,
    handleClose,
    subject,
    refresh
}) {
    const actions = useSubjectActions();
    const { subjectDetail, loading, refresh: refreshDetail } = useSubjectDetail(subject?.id);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    const handleSubmit = (data, onSuccess) => {
        if (!subject?.id || !data) {
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

        actions.updateSubject({ id: subject.id, data, loading, callback: listenUpdateStatus });
    }

    return (
        open &&
        <SubjectDetailDialog
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            loadingSubmit={loadingUpdate}
            loadingDetail={loading}

            mode={CRUD_MODE.view}
            subject={subjectDetail || subject}
            title="Subject Detail"
            submitButton={{
                text: "Update"
            }}
        />
    )
}
