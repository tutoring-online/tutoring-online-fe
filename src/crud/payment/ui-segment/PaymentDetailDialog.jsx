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
import EditButton from "components/Buttons/EditButton";

//Helpers
import yup from "helpers/yupGlobal";
import { CRUD_MODE } from "settings/setting";

const schema = yup.object().shape({
    code: yup.string()
        .required("Code is required"),
    name: yup.string()
        .required("Name is required"),
});

const getDefaultValues = (payment) => {
    if (!payment) return {};

    return {
        ...payment,
    }
}

export default function PaymentDetailDialog({
    open,
    onClose,
    onSubmit,
    payment,
    mode,
    loadingDetail,
    title = "Payment Detail",
    submitButton = {
        text: "Confirm"
    }
}) {

    const {
        // register,
        handleSubmit,
        reset,
        // formState: { errors },
        // control
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
        onSubmit && onSubmit(preparedData);
    }

    const enableEdit = () => {
        setIsEditing(true);
    }

    const cancelEdit = () => {
        setIsEditing(false);
        reset();
    }

    const renderContent = () => isEditing ? (
        <EditingContent
            payment={payment}
            onSubmit={handleSubmit(preparedBeforeSubmit)}
        />
    ) : (
        <ViewMode payment={payment} />
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
                {isEditing ? (
                    <>
                        <CancelButton onClick={cancelEdit} />
                        <SubmitButton
                            onClick={handleSubmit(preparedBeforeSubmit)}
                            text={submitButton.text}
                        />
                    </>
                ) : (
                    <EditButton onClick={enableEdit} />
                )}
            </CustomDialogActions>
        </Dialog>
    )
}
