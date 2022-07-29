import React from 'react'
import SubjectDetailDialog from 'crud/subject/ui-segment/SubjectDetailDialog';
import useSubjectActions from 'hooks/subject/useSubjectActions';
import { CRUD_MODE } from 'settings/setting';

export default function CreateSubject({
    open,
    handleClose,
    setLoadingInfo,
    refresh
}) {
    const actions = useSubjectActions();

    const handleSubmit = (data) => {
        if (!data) return;

        const loading = (isLoading) => {
            setLoadingInfo && setLoadingInfo({
                loading: Boolean(isLoading),
                text: isLoading ? "Creating..." : ""
            })
        }

        const callback = (createStatus) => {
            if (createStatus === true) {
                handleClose && handleClose();
                refresh && refresh();
            }
        }

        actions.createSubject({ data, loading, callback });
    }

    return (
        open &&
        <SubjectDetailDialog
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            mode={CRUD_MODE.create}
            title="Create Subject"
            submitButton={{
                text: "Create"
            }}
        />
    )
}
