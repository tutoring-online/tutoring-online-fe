import React from 'react'
import useTutorActions from 'hooks/tutor/useTutorActions';
import ConfirmDialog from 'components/Dialog/confirm/ConfirmDialog';
import { toast } from 'react-toastify';

export default function DeleteTutor({
    open,
    handleClose,
    setLoadingInfo,
    tutor,
    refresh
}) {
    const actions = useTutorActions();

    const handleOnCancelDelete = () => {
        handleClose();
    }

    const handleOnConfirmDelete = () => {
        handleClose && handleClose();
        if (!tutor?.id) {
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

        actions.deleteTutor({ id: tutor.id, loading, callback });
    }

    const getDescription = () => (
        <span>
            Are you sure you want to delete <b>{tutor?.name}</b> ?
        </span>
    )

    return (
        open &&
        <ConfirmDialog
            open={open}
            title={"Delete tutor"}
            description={getDescription()}
            onCancel={handleOnCancelDelete}
            onConfirm={handleOnConfirmDelete}
        />
    )
}
