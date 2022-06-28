import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//Mui
import { Button, Dialog, DialogContent } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

//Helpers
import yup from "helpers/yupGlobal";
import { validDate, dateFormat2, formatDate } from "helpers/dateUtils";
import {
    CRUD_MODE,
    convertNumberToGender,
    convertGenderToNumber,
} from "settings/setting";

//Core components
import CustomDialogTitle from "components/Dialog/custom/CustomDialogTitle";
import CustomDialogActions from "components/Dialog/custom/CustomDialogActions";
import ViewModeSkeleton from "./ViewModeSkeleton";
import ViewMode from "./ViewMode";
import EditingContent from "./EditingContent";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required").email("Email is invalid"),
});

const preparedBirthday = (birthday) => {
    if (!validDate(birthday)) {
        return null;
    }
    return formatDate(birthday, dateFormat2)
}

const getDefaultValues = (admin) => {
    if (!admin) return {};
    return {
        ...admin,
        birthday: preparedBirthday(admin.birthday),
        gender: convertNumberToGender(admin.gender),
    };
};

export default function AdminDetailDialog({
    open,
    mode,
    admin,
    title = "Admin Detail",
    onClose,
    onSubmit,
    loadingDetail,
    submitButton = {
        text: "Confirm",
    },
}) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm({
        mode: "onSubmit",
        reValidateMode: "onBlur",
        defaultValues: getDefaultValues(admin),
        resolver: yupResolver(schema),
    });

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
            gender: convertGenderToNumber(data.gender),
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

    const isUpdateMode = useCallback(() => {
        return mode === CRUD_MODE.edit || mode === CRUD_MODE.view;
    }, [mode]);

    const renderEditingContent = () => (
        <form onSubmit={handleSubmit(preparedBeforeSubmit)}>
            <EditingContent
                admin={admin}
                control={control}
                register={register}
                errors={errors}
                isUpdateMode={isUpdateMode()}
            />
        </form>
    )

    const renderContent = () => isEditing ? renderEditingContent() : <ViewMode admin={admin} />;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
        >
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
