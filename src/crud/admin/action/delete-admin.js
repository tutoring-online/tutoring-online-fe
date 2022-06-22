import React from 'react'
import useAdminActions from 'hooks/admin/useAdminActions';
import ConfirmDialog from 'components/Dialog/confirm/ConfirmDialog';
import { toast } from 'react-toastify';

export default function CreateAdmin({
    open,
    handleClose,
    setLoadingInfo,
    admin,
    refresh
}) {
    const actions = useAdminActions();

    const handleOnCancelDelete = () => {
        handleClose();
    }

    const handleOnConfirmDelete = () => {
        handleClose && handleClose();
        if (!admin?.id) {
            toast.warn("Something went wrong");
            return;
        }

        const loading = (isLoading) => {
            setLoadingInfo && setLoadingInfo({
                loading: Boolean(isLoading),
                text: isLoading ? "Deleting..." : ""
            })
        }

        const callback = (deleteStatue) => {
            if (deleteStatue === true) {
                refresh && refresh();
            }
        }

        actions.deleteAdmin({ id: admin.id, loading, callback });
    }

    const getDescription = () => (
        <span>
            Are you sure you want to delete <b>{admin?.name}</b> ?
        </span>
    )

    return (
        open &&
        <ConfirmDialog
            open={open}
            title={"Delete admin"}
            description={getDescription()}
            onCancel={handleOnCancelDelete}
            onConfirm={handleOnConfirmDelete}
        />
    )
}
