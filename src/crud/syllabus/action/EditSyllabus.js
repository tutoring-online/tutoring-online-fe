import React, { useState } from 'react'
import SyllabusDetailDialog from 'crud/syllabus/ui-segment/SyllabusDetailDialog';
import useSyllabusActions from 'hooks/syllabus/useSyllabusActions';
import useSyllabusDetail from 'hooks/syllabus/useSyllabusDetail';
import { toast } from 'react-toastify';
import { CRUD_MODE } from 'settings/setting';

export default function EditSyllabus({
    open,
    handleClose,
    syllabus,
    refresh
}) {
    const actions = useSyllabusActions();
    const { syllabusDetail, loading, refresh: refreshDetail } = useSyllabusDetail(syllabus?.id);
    const [loadingUpdate, setLoadingUpdate] = useState(false);


    const handleSubmit = (data, onSuccess) => {
        console.log({data, id: syllabus?.id});
        if (!syllabus?.id || !data) {
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

        actions.updateSyllabus({ id: syllabus.id, data, loading, callback: listenUpdateStatus });
    }

    return (
        open &&
        <SyllabusDetailDialog
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            loadingSubmit={loadingUpdate}
            loadingDetail={loading}

            mode={CRUD_MODE.edit}
            syllabus={syllabusDetail || syllabus}
            title="Syllabus Detail"
            submitButton={{
                text: "Update"
            }}
        />
    )
}
