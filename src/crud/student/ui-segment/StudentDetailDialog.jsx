
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//MUI
import { Dialog, DialogContent } from "@mui/material";

//Core components
import CustomDialogTitle from "components/Dialog/custom/CustomDialogTitle";
import CustomDialogActions from "components/Dialog/custom/CustomDialogActions";
import CancelButton from "components/Buttons/CancelButton";
import SubmitButton from "components/Buttons/SubmitButton";
import EditButton from "components/Buttons/EditButton";
import ViewModeSkeleton from "./ViewModeSkeleton";
import EditingContent from "./EditingContent";
import ViewMode from "./ViewMode";

//Helper
import yup from "helpers/yupGlobal";
import { validDate, dateFormat2, formatDate } from "helpers/dateUtils";
import { CRUD_MODE, convertNumberToGender, convertGenderToNumber } from "settings/setting";

const schema = yup.object().shape({
    name: yup.string()
        .required("Name is required"),
    email: yup.string()
        .required("Email is required")
        .email("Email is invalid"),
});

const getDefaultValues = (student) => {
    if (!student) return {};
    return {
        ...student,
        birthday: validDate(student.birthday) ? formatDate(student.birthday, dateFormat2) : null,
        gender: convertNumberToGender(student.gender)
    }
}

export default function StudentDetailDialog({
    open,
    onClose,
    onSubmit,
    loadingSubmit,
    loadingDetail,

    mode,
    student,
    title = "Student Detail",
    submitButton = {
        text: "Confirm"
    }
}) {

    const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
        mode: "onSubmit",
        reValidateMode: "onBlur",
        defaultValues: getDefaultValues(student),
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        reset(getDefaultValues(student));
    }, [student, reset]);

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

    const isUpdateMode = useCallback(() => {
        return mode === CRUD_MODE.edit || mode === CRUD_MODE.view;
    }, [mode]);

    const renderContent = () => isEditing ? (
        <EditingContent
            student={student}
            control={control}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(preparedBeforeSubmit)}
            isUpdateMode={isUpdateMode()}
        />
    ) : (
        <ViewMode student={student} />
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
