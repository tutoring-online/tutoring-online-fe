
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid
} from "@mui/material";
import { useForm } from "react-hook-form";
import React, { useState } from "react"
import TextField from "components/Form/TextField";
import RadioGroupField from "components/Form/RadioGroupField";

import yup from "helpers/yupGlobal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { ADMIN_STATUSES } from "settings/adminSetting";

const GENDERS = {
    male: "male",
    female: "female"
}
const genderOptions = [
    { label: "Male", value: GENDERS.male },
    { label: "Female", value: GENDERS.female }
]

const schema = yup.object().shape({
    name: yup.string()
        .required("Name is required"),
    email: yup.string()
        .required("Email is required")
        .email("Email is invalid"),
});

const convertNumberToGender = (genderNumber) => {
    if (genderNumber === 1 || genderNumber === "1") return GENDERS.male;
    if (genderNumber === 0 || genderNumber === "0") return GENDERS.female;
    return null;
}

const convertGenderToNumber = (gender) => {
    if (gender === GENDERS.male) return 1;
    if (gender === GENDERS.female) return 0;
    return null;
}

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
    mode = "view",
    title = "Admin Detail",
    submitButton = {
        text: "Confirm"
    }
}) {

    const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
        mode: "onSubmit",
        reValidateMode: "onBlur",
        defaultValues: getDefaultValues(admin),
        resolver: yupResolver(schema)
    })

    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        setIsEdit(() => {
            if (mode === "view") return false;
            if (mode === "edit") return true;
            if (mode === "create") return true;
            return false;
        })
    }, [mode]);

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
            <DialogTitle>
                {title}
            </DialogTitle>
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
                                disabled={!Boolean(isEdit)}
                            />
                            <TextField
                                label="Name"
                                required={true}
                                inputProps={{
                                    ...register("name")
                                }}
                                error={errors.name?.message}
                                disabled={!Boolean(isEdit)}
                            />
                            <TextField
                                label="Phone"
                                inputProps={{
                                    ...register("phone")
                                }}
                                disabled={!Boolean(isEdit)}
                            />
                            <RadioGroupField
                                label="Gender"
                                name="gender"
                                options={genderOptions}
                                control={control}
                                disabled={!Boolean(isEdit)}
                            />
                            <TextField
                                label="Birthday"
                                inputProps={{
                                    type: "date",
                                    ...register("birthday")
                                }}
                                disabled={!Boolean(isEdit)}
                            />
                            <TextField
                                label="Address"
                                inputProps={{
                                    ...register("address")
                                }}
                                disabled={!Boolean(isEdit)}
                            />
                            <TextField
                                label="Avatar Url"
                                inputProps={{
                                    ...register("avatarURL")
                                }}
                                disabled={!Boolean(isEdit)}
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
                    Close
                </Button>

                {isEdit ?
                    <>
                        {mode !== "create" &&
                            <Button
                                variant=""
                                color="info"
                                size="medium"
                                onClick={() => {
                                    setIsEdit(false);
                                    reset();
                                }}
                            >
                                Cancel
                            </Button>
                        }
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
                        onClick={() => setIsEdit(true)}
                        disabled={admin?.status === ADMIN_STATUSES.DELETED}
                    >
                        Enable Update
                    </Button>
                }
            </DialogActions>
        </Dialog>
    )
}
