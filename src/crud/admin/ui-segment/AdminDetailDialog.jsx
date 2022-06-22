
import {
    Button,
    Dialog,
    DialogContent,
    Grid,
} from "@mui/material";

import { useForm } from "react-hook-form";
import React from "react";
import TextField from "components/Form/TextField";
import RadioGroupField from "components/Form/RadioGroupField";

import yup from "helpers/yupGlobal";
import { yupResolver } from "@hookform/resolvers/yup";
import { convertNumberToGender } from "settings/setting";
import { convertGenderToNumber } from "settings/setting";
import { genderOptions } from "settings/setting";
import CustomDialogTitle from "components/Dialog/custom/DialogTitle";
import CustomDialogActions from "components/Dialog/custom/DialogActions";

const schema = yup.object().shape({
    name: yup.string()
        .required("Name is required"),
    email: yup.string()
        .required("Email is required")
        .email("Email is invalid"),
});

const getDefaultValues = (admin) => ({
    ...(admin ?
        { ...admin, gender: convertNumberToGender(admin.gender) }
        :
        {}
    ),
})

export default function AdminDetailDialog({
    open,
    onClose,
    onSubmit,
    admin,
    title = "Admin Detail",
    submitButton = {
        text: "Confirm"
    }
}) {

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        mode: "onSubmit",
        reValidateMode: "onBlur",
        defaultValues: getDefaultValues(admin),
        resolver: yupResolver(schema)
    })

    const preparedBeforeSubmit = (data) => {
        const preparedData = {
            ...data,
            gender: convertGenderToNumber(data.gender)
        }
        onSubmit && onSubmit(preparedData);
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <CustomDialogTitle
                title={title}
                onClose={onClose}
            />
            <DialogContent>
                <form onSubmit={handleSubmit(preparedBeforeSubmit)}>
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
                            />
                            <TextField
                                label="Name"
                                required={true}
                                inputProps={{
                                    ...register("name")
                                }}
                                error={errors.name?.message}
                            />
                            <TextField
                                label="Phone"
                                inputProps={{
                                    ...register("phone")
                                }}
                            />
                            <RadioGroupField
                                label="Gender"
                                name="gender"
                                options={genderOptions}
                                control={control}
                            />
                            <TextField
                                label="Birthday"
                                inputProps={{
                                    type: "date",
                                    ...register("birthday")
                                }}
                            />
                            <TextField
                                label="Address"
                                inputProps={{
                                    ...register("address")
                                }}
                            />
                            <TextField
                                label="Avatar Url"
                                inputProps={{
                                    ...register("avatarURL")
                                }}
                            />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <CustomDialogActions>
                <Button
                    variant=""
                    color="info"
                    size="medium"
                    onClick={onClose}
                    sx={{ background: "#fff", "&:hover": { background: "#f3f3f3" } }}
                >
                    Close
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
            </CustomDialogActions>
        </Dialog>
    )
}
