import React, { useCallback, useEffect, useState } from "react";
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
import { CRUD_MODE, convertNumberToGender, convertGenderToNumber } from "settings/setting";
import { validDate, dateFormat2, formatDate } from "helpers/dateUtils";

const schema = yup.object().shape({
    name: yup.string()
        .required("Name is required"),
    email: yup.string()
        .required("Email is required")
        .email("Email is invalid"),
});

const getDefaultValues = (tutor) => {
    if (!tutor) return {};
    return {
        ...tutor,
        birthday: validDate(tutor.birthday) ? formatDate(tutor.birthday, dateFormat2) : null,
        gender: convertNumberToGender(tutor.gender)
    }
}

export default function TutorDetailDialog({
    open,
    onClose,
    onSubmit,
    loadingSubmit,
    loadingDetail,

    mode,
    tutor,
    title = "Tutor Detail",
    submitButton = {
        text: "Confirm"
    }
}) {

    const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
        mode: "onSubmit",
        reValidateMode: "onBlur",
        defaultValues: getDefaultValues(tutor),
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        reset(getDefaultValues(tutor));
    }, [tutor, reset]);

    const isUpdateMode = useCallback(() => {
        return mode === CRUD_MODE.edit || mode === CRUD_MODE.view;
    }, [mode]);

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
            gender: convertGenderToNumber(data.gender)
        }
        const onSuccess = () => setIsEditing(false);

        onSubmit && onSubmit(preparedData, onSuccess);
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
            tutor={tutor}
            control={control}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(preparedBeforeSubmit)}
            isUpdateMode={isUpdateMode()}
        />
    ) : (
        <ViewMode tutor={tutor} />
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
                            loading={loadingSubmit}
                        />
                    </>
                ) : (
                    <EditButton onClick={enableEdit} />
                )}
            </CustomDialogActions>
        </Dialog>
    )
}
