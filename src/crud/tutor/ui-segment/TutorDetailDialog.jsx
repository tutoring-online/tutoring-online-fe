
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
import RadioGroupField from "components/Form/RadioGroupField";
import CustomDialogTitle from "components/Dialog/custom/CustomDialogTitle";
import CustomDialogActions from "components/Dialog/custom/CustomDialogActions";

import yup from "helpers/yupGlobal";
import { yupResolver } from "@hookform/resolvers/yup";
import { CRUD_MODE, genderOptions, convertNumberToGender, convertGenderToNumber } from "settings/setting";
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
    tutor,
    mode,
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
            gender: convertGenderToNumber(data.gender)
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
                                label="Email"
                                required={true}
                                inputProps={{
                                    ...register("email"),
                                    autoFocus: true
                                }}
                                error={errors.email?.message}
                                disabled={isDisabled}
                            />
                        </Grid>
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
                        <Grid item xs={12} lg={6}>
                            <TextField
                                label="Phone"
                                inputProps={{
                                    ...register("phone")
                                }}
                                disabled={isDisabled}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                label="Birthday"
                                inputProps={{
                                    type: "date",
                                    ...register("birthday")
                                }}
                                disabled={isDisabled}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RadioGroupField
                                label="Gender"
                                name="gender"
                                row={true}
                                options={genderOptions}
                                control={control}
                                disabled={isDisabled}
                            />
                        </Grid>
                        <Grid item xs={12}>

                            <TextField
                                label="Address"
                                inputProps={{
                                    ...register("address")
                                }}
                                disabled={isDisabled}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Avatar Url"
                                inputProps={{
                                    ...register("avatarURL")
                                }}
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
