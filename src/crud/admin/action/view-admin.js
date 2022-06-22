import React from 'react'
import AdminDetailDialog from 'crud/admin/ui-segment/AdminDetailDialog';
import useAdminActions from 'hooks/admin/useAdminActions';
import { toast } from 'react-toastify';

export default function ViewAdmin({
    open,
    handleClose,
    setLoadingInfo,
    admin,
    refresh
}) {
    const actions = useAdminActions();

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
            admin={admin}
            mode="view"
            submitButton={{
                text: "Update"
            }}
        />
    )
}
