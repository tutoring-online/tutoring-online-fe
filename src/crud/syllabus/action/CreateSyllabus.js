import React from 'react'
import SyllabusDetailDialog from 'crud/syllabus/ui-segment/SyllabusDetailDialog';
import useSyllabusActions from 'hooks/syllabus/useSyllabusActions';
import { CRUD_MODE } from 'settings/setting';

export default function CreateSyllabus({
    open,
    handleClose,
    setLoadingInfo,
    refresh
}) {
    const actions = useSyllabusActions();

    const handleSubmit = (data) => {
        if (!data) return;
        console.log(data);

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

        actions.createSyllabus({ data, loading, callback });
    }

    return (
        open &&
        <SyllabusDetailDialog
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            mode={CRUD_MODE.create}
            title="Create Syllabus"
            submitButton={{
                text: "Create"
            }}
        />
    )
}
