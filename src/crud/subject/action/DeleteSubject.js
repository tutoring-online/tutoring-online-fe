import React from 'react'
import useSubjectActions from 'hooks/subject/useSubjectActions';
import ConfirmDialog from 'components/Dialog/confirm/ConfirmDialog';
import { toast } from 'react-toastify';

export default function DeleteSubject({
    open,
    handleClose,
    setLoadingInfo,
    subject,
    refresh
}) {
    const actions = useSubjectActions();

    const handleOnCancelDelete = () => {
        handleClose();
    }

    const handleOnConfirmDelete = () => {
        handleClose && handleClose();
        if (!subject?.id) {
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

        actions.deleteSubject({ id: subject.id, loading, callback });
    }

    const getDescription = () => (
        <span>
            Are you sure you want to delete <b>{subject?.name}</b> ?
        </span>
    )

    return (
        open &&
        <ConfirmDialog
            open={open}
            title={"Delete subject"}
            description={getDescription()}
            onCancel={handleOnCancelDelete}
            onConfirm={handleOnConfirmDelete}
        />
    )
}
