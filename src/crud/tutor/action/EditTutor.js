import React from 'react'
import TutorDetailDialog from 'crud/tutor/ui-segment/TutorDetailDialog';
import useTutorActions from 'hooks/tutor/useTutorActions';
import { toast } from 'react-toastify';
import { CRUD_MODE } from 'settings/setting';

export default function EditTutor({
    open,
    handleClose,
    setLoadingInfo,
    tutor,
    refresh
}) {
    const actions = useTutorActions();

    const handleSubmit = (data) => {
        if (!tutor?.id || !data) {
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

        actions.updateTutor({ id: tutor.id, data, loading, callback });
    }

    return (
        open &&
        <TutorDetailDialog
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            tutor={tutor}
            mode={CRUD_MODE.edit}
            title="Tutor Detail"
            submitButton={{
                text: "Update"
            }}
        />
    )
}
