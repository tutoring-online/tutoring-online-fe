import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//Mui
import { Dialog, DialogContent } from "@mui/material";

//Core component
import CustomDialogTitle from "components/Dialog/custom/CustomDialogTitle";
import CustomDialogActions from "components/Dialog/custom/CustomDialogActions";
import EditingContent from "./EditingContent";
import ViewMode from "./ViewMode";
import ViewModeSkeleton from "./ViewModeSkeleton";
import CancelButton from "components/Buttons/CancelButton";
import SubmitButton from "components/Buttons/SubmitButton";
import EditButton from "components/Buttons/EditButton";

//Helper
import yup from "helpers/yupGlobal";
import { CRUD_MODE } from "settings/setting";

const schema = yup.object().shape({
    name: yup.string().required("Name is required."),
    description: yup
        .string()
        .test("len", "Maximum 1000 characters.", (input) => input.length > 1000),
});

const getDefaultValues = (category) => {
    if (!category) return {};
    return {
        ...category,
    };
};

export default function TutorDetailDialog({
    open,
    onClose,
    onSubmit,
    category,
    loadingDetail,
    mode,
    title = "Tutor Detail",
    submitButton = {
        text: "Confirm",
    },
}) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onSubmit",
        reValidateMode: "onBlur",
        defaultValues: getDefaultValues(category),
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        reset(getDefaultValues(category));
    }, [category, reset]);

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setIsEditing(() => {
            if (mode === CRUD_MODE.create) return true;
            if (mode === CRUD_MODE.edit) return true;
            return false;
        });
    }, [mode]);

    const preparedBeforeSubmit = (data) => {
        const preparedData = {
            ...data,
        };
        onSubmit && onSubmit(preparedData);
    };

    const enableEdit = () => {
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setIsEditing(false);
        reset();
    };


    const renderContent = () => isEditing ? (
        <EditingContent
            register={register}
            errors={errors}
            onSubmit={handleSubmit(preparedBeforeSubmit)}
        />
    ) : (
        <ViewMode category={category} />
    )

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md">
            <CustomDialogTitle title={title} onClose={onClose} />
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
    );
}
