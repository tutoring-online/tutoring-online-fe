
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid
} from "@mui/material";
import { useForm } from "react-hook-form";
import React from "react"
import TextField from "components/Form/TextField";
import RadioGroupField from "components/Form/RadioGroupField";

import yup from "helpers/yupGlobal";
import { yupResolver } from "@hookform/resolvers/yup";

const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" }
]

const schema = yup.object().shape({
    name: yup.string()
        .required("Name is required"),
    email: yup.string()
        .required("Email is required")
        .email("Email is invalid"),
});

export default function AdminDetailDialog({
    open,
    onClose,
    onSubmit,

    title = "Admin Detail",
    submitButton = {
        text: "Confirm"
    }
}) {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onSubmit",
        reValidateMode: "onBlur",
        defaultValues: {},
        resolver: yupResolver(schema)
    })

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                options={genderOptions}
                                inputProps={{
                                    ...register("gender")
                                }}
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
            <DialogActions>
                <Button
                    variant=""
                    color="info"
                    size="medium"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                >
                    {submitButton?.text}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
