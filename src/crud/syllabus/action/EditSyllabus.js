import React from 'react'
import SyllabusDetailDialog from 'crud/syllabus/ui-segment/SyllabusDetailDialog';
import useSyllabusActions from 'hooks/syllabus/useSyllabusActions';
import { toast } from 'react-toastify';
import { CRUD_MODE } from 'settings/setting';

export default function EditSyllabus({
    open,
    handleClose,
    setLoadingInfo,
    syllabus,
    refresh
}) {
    const actions = useSyllabusActions();

    const handleSubmit = (data) => {
        if (!syllabus?.id || !data) {
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

        actions.updateSyllabus({ id: syllabus.id, data, loading, callback });
    }

    return (
        open &&
        <SyllabusDetailDialog
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            syllabus={syllabus}
            mode={CRUD_MODE.edit}
            title="Syllabus Detail"
            submitButton={{
                text: "Update"
            }}
        />
    )
}
