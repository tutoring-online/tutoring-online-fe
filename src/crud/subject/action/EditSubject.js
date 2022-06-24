import React from 'react'
import SubjectDetailDialog from 'crud/subject/ui-segment/SubjectDetailDialog';
import useSubjectActions from 'hooks/subject/useSubjectActions';
import { toast } from 'react-toastify';
import { CRUD_MODE } from 'settings/setting';

export default function EditSubject({
    open,
    handleClose,
    setLoadingInfo,
    subject,
    refresh
}) {
    const actions = useSubjectActions();

    const handleSubmit = (data) => {
        if (!subject?.id || !data) {
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

        actions.updateSubject({ id: subject.id, data, loading, callback });
    }

    return (
        open &&
        <SubjectDetailDialog
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            subject={subject}
            mode={CRUD_MODE.edit}
            title="Subject Detail"
            submitButton={{
                text: "Update"
            }}
        />
    )
}
