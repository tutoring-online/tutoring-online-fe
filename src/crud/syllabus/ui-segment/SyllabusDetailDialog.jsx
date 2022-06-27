
import {
    Button,
    Dialog,
    DialogContent,
    Grid,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import TextField from "components/Form/TextField";
import CustomDialogTitle from "components/Dialog/custom/CustomDialogTitle";
import CustomDialogActions from "components/Dialog/custom/CustomDialogActions";

import yup from "helpers/yupGlobal";
import { yupResolver } from "@hookform/resolvers/yup";
import { CRUD_MODE } from "settings/setting";
import { SYLLABUS_STATUSES } from "settings/syllabus-setting";

const schema = yup.object().shape({
    code: yup.string()
        .required("Code is required"),
    name: yup.string()
        .required("Name is required"),
    categoryId: yup.string().nullable()
        .required("Category is required"),
});

const getDefaultValues = (syllabus) => {
    if (!syllabus) return {
        status: SYLLABUS_STATUSES.ACTIVE
    };

    return {
        ...syllabus,
    }
}

export default function SyllabusDetailDialog({
    open,
    onClose,
    onSubmit,
    syllabus,
    mode,
    title = "Tutor Detail",
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
        setIsEditing(() => {
            if (mode === CRUD_MODE.create) return true;
            if (mode === CRUD_MODE.edit) return true;
            return false;
        })
    }, [mode])

    const isDisabled = !isEditing;

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
                <form
                    onSubmit={handleSubmit(preparedBeforeSubmit)}
                >
                    <Grid container>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                label="Name"
                                required={true}
                                inputProps={{
                                    ...register("name")
                                }}
                                error={errors.name?.message}
                                disabled={isDisabled}
                            />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <CustomDialogActions>
                {isEditing ?
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

                    :
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={enableEdit}
                        startIcon={<EditIcon />}
                    >
                        Enable Edit
                    </Button>
                }
            </CustomDialogActions>
        </Dialog>
    )
}
