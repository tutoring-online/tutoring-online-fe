import React from 'react'
import AdminDetailDialog from 'crud/admin/ui-segment/AdminDetailDialog';
import useAdminActions from 'hooks/admin/useAdminActions';
import { CRUD_MODE } from 'settings/setting';

export default function CreateAdmin({
    open,
    handleClose,
    setLoadingInfo,
    refresh
}) {
    const actions = useAdminActions();

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

        actions.createAdmin({ data, loading, callback });
    }

    return (
        open &&
        <AdminDetailDialog
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            mode={CRUD_MODE.create}
            title="Create Admin"
            submitButton={{
                text: "Create"
            }}
        />
    )
}
