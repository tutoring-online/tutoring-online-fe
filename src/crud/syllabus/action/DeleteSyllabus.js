import React from 'react'
import useSyllabusActions from 'hooks/syllabus/useSyllabusActions';
import ConfirmDialog from 'components/Dialog/confirm/ConfirmDialog';
import { toast } from 'react-toastify';

export default function DeleteSubject({
    open,
    handleClose,
    setLoadingInfo,
    syllabus,
    refresh
}) {
    const actions = useSyllabusActions();

    const handleOnCancelDelete = () => {
        handleClose();
    }

    const handleOnConfirmDelete = () => {
        handleClose && handleClose();
        if (!syllabus?.id) {
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

        actions.deleteSyllabus({ id: syllabus.id, loading, callback });
    }

    const getDescription = () => (
        <span>
            Are you sure you want to delete <b>{syllabus?.name}</b> ?
        </span>
    )

    return (
        open &&
        <ConfirmDialog
            open={open}
            title={"Delete Syllabus"}
            description={getDescription()}
            onCancel={handleOnCancelDelete}
            onConfirm={handleOnConfirmDelete}
        />
    )
}
