
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

const schema = yup.object().shape({
    name: yup.string()
        .required("Name is required."),
    description: yup.string()
        .test("len", "Maximum 1000 characters.", (input) => input.length > 1000)
});

const getDefaultValues = (category) => {
    if (!category) return {};
    return {
        ...category,
    }
}

export default function TutorDetailDialog({
    open,
    onClose,
    onSubmit,
    category,
    mode,
    title = "Tutor Detail",
    submitButton = {
        text: "Confirm"
    }
}) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: "onSubmit",
        reValidateMode: "onBlur",
        defaultValues: getDefaultValues(category),
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
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                inputProps={{
                                    ...register("description"),
                                    multiline: true,
                                    rows: 4,
                                }}
                                error={errors.description?.message}
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
