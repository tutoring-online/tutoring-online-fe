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
});

const getDefaultValues = (syllabus) => {
    if (!syllabus) return {};

    return {
        ...syllabus,
    }
}

export default function SyllabusDetailDialog({
    open,
    onClose,
    onSubmit,
    loadingSubmit,
    loadingDetail,

    mode,
    syllabus,
    title = "Syllabus Detail",
    submitButton = {
        text: "Confirm"
    }
}) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: "onSubmit",
        reValidateMode: "onBlur",
        defaultValues: getDefaultValues(syllabus),
        resolver: yupResolver(schema)
    })

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        reset(getDefaultValues(syllabus));
    }, [syllabus, reset]);

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

    const enableEdit = () => {
        setIsEditing(true);
    }

    const cancelEdit = () => {
        setIsEditing(false);
        reset();
    }

    const renderContent = () => isEditing ? (
        <EditingContent
            register={register}
            errors={errors}
            onSubmit={handleSubmit(preparedBeforeSubmit)}
        />
    ) : (
        <ViewMode syllabus={syllabus} />
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
