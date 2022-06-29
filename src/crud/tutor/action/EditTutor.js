import React, { useState } from 'react'
import TutorDetailDialog from 'crud/tutor/ui-segment/TutorDetailDialog';
import useTutorActions from 'hooks/tutor/useTutorActions';
import useTutorDetail from 'hooks/tutor/useTutorDetail';
import { toast } from 'react-toastify';
import { CRUD_MODE } from 'settings/setting';

export default function EditTutor({
    open,
    handleClose,
    tutor,
    refresh
}) {
    const actions = useTutorActions();
    const { tutorDetail, loading, refresh: refreshDetail } = useTutorDetail(tutor?.id);
    const [loadingUpdate, setLoadingUpdate] = useState(false);


    const handleSubmit = (data, onSuccess) => {
        if (!tutor?.id || !data) {
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

        actions.updateTutor({ id: tutor.id, data, loading, callback: listenUpdateStatus });
    }

    return (
        open &&
        <TutorDetailDialog
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            loadingSubmit={loadingUpdate}
            loadingDetail={loading}

            mode={CRUD_MODE.edit}
            tutor={tutorDetail || tutor}
            title="Tutor Detail"
            submitButton={{
                text: "Update"
            }}
        />
    )
}
