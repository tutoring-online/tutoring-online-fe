import { Button, Dialog, DialogContent } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import CustomDialogTitle from "components/Dialog/custom/CustomDialogTitle";
import CustomDialogActions from "components/Dialog/custom/CustomDialogActions";

import yup from "helpers/yupGlobal";
import { yupResolver } from "@hookform/resolvers/yup";
import { CRUD_MODE } from "settings/setting";
import EditingContent from "./EditingContent";
import ViewMode from "./ViewMode";
import ViewModeSkeleton from "./ViewModeSkeleton";

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

    const renderEditingContent = () => (
        <form onSubmit={handleSubmit(preparedBeforeSubmit)}>
            <EditingContent
                register={register}
                errors={errors}
            />
        </form>
    )

    const renderContent = () => isEditing ? renderEditingContent() : <ViewMode category={category} />

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md">
            <CustomDialogTitle title={title} onClose={onClose} />
            <DialogContent>
                {loadingDetail ? <ViewModeSkeleton /> : renderContent()}
            </DialogContent>
            <CustomDialogActions>
                {isEditing ? (
                    <>
                        <Button
                            variant=""
                            color="info"
                            size="medium"
                            onClick={cancelEdit}
                            sx={{ background: "#fff", "&:hover": { background: "#f3f3f3" } }}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            type="submit"
                            onClick={handleSubmit(preparedBeforeSubmit)}
                        >
                            {submitButton?.text}
                        </Button>
                    </>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={enableEdit}
                        startIcon={<EditIcon />}
                    >
                        Enable Edit
                    </Button>
                )}
            </CustomDialogActions>
        </Dialog>
    );
}
