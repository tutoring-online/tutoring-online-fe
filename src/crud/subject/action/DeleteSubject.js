import React from 'react'
import useCategoryActions from 'hooks/category/useCategoryActions';
import ConfirmDialog from 'components/Dialog/confirm/ConfirmDialog';
import { toast } from 'react-toastify';

export default function DeleteSubject({
    open,
    handleClose,
    setLoadingInfo,
    category,
    refresh
}) {
    const actions = useCategoryActions();

    const handleOnCancelDelete = () => {
        handleClose();
    }

    const handleOnConfirmDelete = () => {
        handleClose && handleClose();
        if (!category?.id) {
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

        actions.deleteCategory({ id: category.id, loading, callback });
    }

    const getDescription = () => (
        <span>
            Are you sure you want to delete <b>{category?.name}</b> ?
        </span>
    )

    return (
        open &&
        <ConfirmDialog
            open={open}
            title={"Delete category"}
            description={getDescription()}
            onCancel={handleOnCancelDelete}
            onConfirm={handleOnConfirmDelete}
        />
    )
}
