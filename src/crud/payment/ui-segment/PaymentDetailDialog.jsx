import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//Mui
import { Dialog, DialogContent } from "@mui/material";

//Core components
import CustomDialogTitle from "components/Dialog/custom/CustomDialogTitle";
import CustomDialogActions from "components/Dialog/custom/CustomDialogActions";
import EditingContent from "./EditingContent";
import ViewMode from "./ViewMode";
import ViewModeSkeleton from "./ViewModeSkeleton";
import CancelButton from "components/Buttons/CancelButton";
import SubmitButton from "components/Buttons/SubmitButton";
// import EditButton from "components/Buttons/EditButton";

//Helpers
import yup from "helpers/yupGlobal";
import { CRUD_MODE } from "settings/setting";

const schema = yup.object().shape({
    combo: yup.string().required("Combo is required").nullable(),
    dateSession: yup.string().required("Date session is required").nullable(),
});

const getDefaultValues = (payment) => {
    if (!payment) return {
        combo: null,
        dateSession: null
    };

    return {
        ...payment,

    }
}

export default function PaymentDetailDialog({
    open,
    onClose,
    onSubmit,
    loadingSubmit,
    loadingDetail,

    mode,
    payment,
    syllabus,
    title = "Payment Detail",
    submitButton = {
        text: "Confirm"
    }
}) {

    const {
        // register,
        handleSubmit,
        reset,
        formState: { errors },
        control
    } = useForm({
        mode: "onSubmit",
        reValidateMode: "onBlur",
        defaultValues: getDefaultValues(payment),
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        reset(getDefaultValues(payment));
    }, [payment, reset]);

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setIsEditing(() => {
            if (mode === CRUD_MODE.create) return true;
            if (mode === CRUD_MODE.edit) return true;
            return false;
        })
    }, [mode])

    const preparedBeforeSubmit = (data) => {
        const preparedData = {
            ...data,
        }
        const onSuccess = () => setIsEditing(false);

        onSubmit && onSubmit(preparedData, onSuccess);
    }

    const cancelEdit = () => {
        if (mode === CRUD_MODE.create) {
            onClose && onClose();
            return;
        }
        setIsEditing(false);
        reset();
    }

    console.log(payment);

    const renderContent = () => isEditing ? (
        <EditingContent
            payment={payment}
            syllabus={syllabus}
            control={control}
            errors={errors}
            onSubmit={handleSubmit(preparedBeforeSubmit)}
        />
    ) : (
        <ViewMode payment={payment} />
    )

    const renderBottomPanel = () => (
        isEditing ? (
            <>
                <CancelButton onClick={cancelEdit} />
                <SubmitButton
                    onClick={handleSubmit(preparedBeforeSubmit)}
                    text={submitButton.text}
                    loading={loadingSubmit}
                />
            </>
        ) : (
            <CancelButton onClick={cancelEdit} text="Close"/>
        )
    )

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
        >
            <CustomDialogTitle
                title={title}
                onClose={onClose}
            />
            <DialogContent>
                {loadingDetail ? <ViewModeSkeleton /> : renderContent()}
            </DialogContent>
            <CustomDialogActions>
                {renderBottomPanel()}
            </CustomDialogActions>
        </Dialog>
    )
}
