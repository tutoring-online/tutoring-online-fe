import React from 'react'
import AdminDetailDialog from 'crud/admin/ui-segment/AdminDetailDialog';
import useAdminActions from 'hooks/admin/useAdminActions';
import { toast } from 'react-toastify';
import { CRUD_MODE } from 'settings/setting';
import useAdminDetail from 'hooks/admin/useAdminDetail';

export default function EditAdmin({
    open,
    handleClose,
    setLoadingInfo,
    admin,
    refresh
}) {
    const actions = useAdminActions();
    const { adminDetail, loading: loadingDetail } = useAdminDetail(admin?.id);

    const handleSubmit = (data) => {
        if (!admin?.id || !data) {
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

        actions.updateAdmin({ id: admin?.id, data, loading, callback });
    }

    return (
        open &&
        <AdminDetailDialog
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            admin={adminDetail || admin}
            mode={CRUD_MODE.edit}
            loadingDetail={loadingDetail}
            title="Admin Detail"
            submitButton={{
                text: "Update"
            }}
        />
    )
}
