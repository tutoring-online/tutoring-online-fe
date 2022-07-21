import React from 'react'
import useSyllabusActions from 'hooks/syllabus/useSyllabusActions';
import ConfirmDialog from 'components/Dialog/confirm/ConfirmDialog';
import { toast } from 'react-toastify';
import { SYLLABUS_STATUSES } from 'settings/syllabus-setting';

export default function SwitchActiveSyllabus({
    open,
    handleClose,
    setLoadingInfo,
    syllabus,
    refresh
}) {
    const actions = useSyllabusActions();

    const handleOnCancel = () => {
        handleClose();
    }

    const handleOnConfirm = () => {
        handleClose && handleClose();
        if (!syllabus?.id) {
            toast.warn("Something went wrong");
            return;
        }

        const loading = (isLoading) => {
            setLoadingInfo && setLoadingInfo({
                loading: Boolean(isLoading),
                text: isLoading ? "Loading..." : ""
            })
        }

        const callback = (deleteStatue) => {
            if (deleteStatue === true) {
                refresh && refresh();
            }
        }

        const data = {
            status: syllabus.status === SYLLABUS_STATUSES.ACTIVE ?
                SYLLABUS_STATUSES.INACTIVE : SYLLABUS_STATUSES.ACTIVE,
        }
        actions.updateSyllabus({ id: syllabus.id, data, loading, callback });
    }

    const getAction = () => {
        if (syllabus.status === SYLLABUS_STATUSES.ACTIVE) {
            return "inactive";
        }

        if (syllabus.status === SYLLABUS_STATUSES.INACTIVE) {
            return "active ";
        }

        return "change";
    }

    const getDescription = () => (
        <span>
            Are you sure you want to {`${getAction()}`} <b>{syllabus?.name}</b> ?
        </span>
    )

    const getTitle = () => {
        if (syllabus.status === SYLLABUS_STATUSES.ACTIVE) {
            return "Inactive Syllabus";
        }

        if (syllabus.status === SYLLABUS_STATUSES.INACTIVE) {
            return "Active Syllabus";
        }

        return "Syllabus";
    }

    return (
        open &&
        <ConfirmDialog
            open={open}
            title={getTitle()}
            description={getDescription()}
            onCancel={handleOnCancel}
            onConfirm={handleOnConfirm}
        />
    )
}
