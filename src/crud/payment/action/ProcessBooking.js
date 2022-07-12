import React, { useState } from 'react'
import PaymentDetailDialog from 'crud/payment/ui-segment/PaymentDetailDialog';
import usePaymentActions from 'hooks/payment/usePaymentActions';
import { CRUD_MODE } from 'settings/setting';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getFullPath } from 'route/routes';
import { ROUTES } from 'route/routes';
import { isStudent } from 'settings/setting';
import { toast } from 'react-toastify';

export default function ProcessBooking({
    open,
    handleClose,
    syllabus,
    refresh,
}) {
    const actions = usePaymentActions();
    const user = useSelector(state => state.auth.user);
    const history = useHistory();

    const [loadingCreate, setLoadingCreate] = useState(false);

    const handleSubmit = (data) => {
        console.log(data);
        const loading = (isLoading) => {
            setLoadingCreate(Boolean(isLoading));
        }

        const listenCreateStatus = (updateStatus) => {
            if (updateStatus === true) {
                refresh && refresh();
                handleClose();
            }
        }

        if (!user) {
            toast.warn("Please login before you can booking a course.");
            history.push(getFullPath(ROUTES.login));
            return;
        }

        if (!isStudent(user?.role)) {
            toast.warn("You cannot do that. Only student can booking a course.");
            return;
        }

        const fullData = {
            ...data,
            studentId: user.id,
            syllabusId: syllabus.id,
        }

        actions.createPayment({
            data: fullData,
            loading,
            callback: listenCreateStatus
        });
    }

    return (
        open &&
        <PaymentDetailDialog
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            loadingSubmit={loadingCreate}

            mode={CRUD_MODE.create}
            syllabus={syllabus}
            title={"Booking"}
            submitButton={{
                text: "Booking"
            }}
        />
    )
}
