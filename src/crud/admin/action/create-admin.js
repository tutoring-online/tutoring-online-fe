import React from 'react'
import AdminDetailDialog from 'crud/admin/ui-segment/AdminDetailDialog';
import useAdminActions from 'hooks/admin/useAdminActions';

export default function CreateAdmin({
    open,
    handleClose,
    setLoadingInfo
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
                handleClose();
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
        />
    )
}
