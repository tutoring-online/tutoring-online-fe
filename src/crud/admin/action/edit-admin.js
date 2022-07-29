import React, { useState } from 'react'
import AdminDetailDialog from 'crud/admin/ui-segment/AdminDetailDialog';
import useAdminActions from 'hooks/admin/useAdminActions';
import { toast } from 'react-toastify';
import { CRUD_MODE } from 'settings/setting';
import useAdminDetail from 'hooks/admin/useAdminDetail';

export default function EditAdmin({
    open,
    handleClose,
    admin,
    refresh
}) {
    const actions = useAdminActions();
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const { adminDetail, loading, refresh : refreshDetail } = useAdminDetail(admin?.id);

    const handleSubmit = (data, onSuccess) => {
        if (!admin?.id || !data) {
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

        actions.updateAdmin({ id: admin?.id, data, loading, callback: listenUpdateStatus });
    }

    return (
        open &&
        <AdminDetailDialog
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            loadingSubmit={loadingUpdate}
            loadingDetail={loading}

            admin={adminDetail}
            mode={CRUD_MODE.edit}
            title="Admin Detail"
            submitButton={{
                text: "Update"
            }}
        />
    )
}
