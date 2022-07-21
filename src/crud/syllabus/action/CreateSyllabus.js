import React, { useState } from 'react'
import SyllabusDetailDialog from 'crud/syllabus/ui-segment/SyllabusDetailDialog';
import useSyllabusActions from 'hooks/syllabus/useSyllabusActions';
import { CRUD_MODE } from 'settings/setting';
import { SYLLABUS_STATUSES } from 'settings/syllabus-setting';

export default function CreateSyllabus({
    open,
    handleClose,
    setLoadingInfo,
    refresh
}) {
    const actions = useSyllabusActions();
    const [loadingCreate, setLoadingCreate] = useState(false);

    const handleSubmit = (data) => {
        if (!data) return;

        const loading = (isLoading) => {
            setLoadingCreate(isLoading);
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

        const preparedData = {
            ...data,
            status: SYLLABUS_STATUSES.ACTIVE
        }
        actions.createSyllabus({ data: [preparedData], loading, callback });
    }

    return (
        open &&
        <SyllabusDetailDialog
            open={open}
            onClose={handleClose}
            loadingSubmit={loadingCreate}
            onSubmit={handleSubmit}
            mode={CRUD_MODE.create}
            title="Create Syllabus"
            submitButton={{
                text: "Create"
            }}
        />
    )
}
