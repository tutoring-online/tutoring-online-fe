import { Button, Dialog, DialogContent, Grid, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import TextField from "components/Form/TextField";
import RadioGroupField from "components/Form/RadioGroupField";
import CustomDialogTitle from "components/Dialog/custom/CustomDialogTitle";
import CustomDialogActions from "components/Dialog/custom/CustomDialogActions";

import yup from "helpers/yupGlobal";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CRUD_MODE,
  genderOptions,
  convertNumberToGender,
  convertGenderToNumber,
} from "settings/setting";
import { validDate, dateFormat2, formatDate } from "helpers/dateUtils";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
});

const getDefaultValues = (admin) => {
  if (!admin) return {};
  return {
    ...admin,
    birthday: validDate(admin.birthday)
      ? formatDate(admin.birthday, dateFormat2)
      : null,
    gender: convertNumberToGender(admin.gender),
  };
};

export default function AdminDetailDialog({
  open,
  onClose,
  onSubmit,
  admin,
  mode,
  title = "Admin Detail",
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

  const isDisabled = !isEditing;

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
    console.log(admin);
  };

  function renderDisplayContent() {
    return (
      <div>
        <Grid container paddingLeft="4rem">
          <Grid item xs={12} lg={6} marginBottom="20px">
            <Typography fontSize={18} fontWeight="bold">
              Name:
            </Typography>
            <Typography>{admin?.name || "N/A"}</Typography>
          </Grid>          
          <Grid item xs={12} lg={6} marginBottom="20px">
            <Typography fontSize={18} fontWeight="bold">
              Email:
            </Typography>
            <Typography>{admin?.email || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} lg={6} marginBottom="20px">
            <Typography fontSize={18} fontWeight="bold">
              Birthday:
            </Typography>
            <Typography>{admin?.birthday || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} lg={6} marginBottom="20px"v>
            <Typography fontSize={18} fontWeight="bold">
              Phone:
            </Typography>
            <Typography>{admin?.phone || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} lg={6} marginBottom="20px">
            <Typography fontSize={18} fontWeight="bold" on>
              Address
            </Typography>
            <Typography>{admin?.address || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} lg={6} marginBottom="20px">
            <Typography fontSize={18} fontWeight="bold">
              AvatarURL:
            </Typography>
            <Typography>{admin?.avatarURL || "N/A"}</Typography>
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <CustomDialogTitle title={title} onClose={onClose} />
      <DialogContent>
        {isEditing ? (
          <form onSubmit={handleSubmit(preparedBeforeSubmit)}>
            <Grid container>
              <Grid item xs={12} lg={6}>
                <TextField
                  label="Email"
                  required={true}
                  inputProps={{
                    ...register("email"),
                    autoFocus: true,
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
                    ...register("name"),
                  }}
                  error={errors.name?.message}
                  disabled={isDisabled}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  label="Phone"
                  inputProps={{
                    ...register("phone"),
                  }}
                  disabled={isDisabled}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  label="Birthday"
                  inputProps={{
                    type: "date",
                    ...register("birthday"),
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
                    ...register("address"),
                  }}
                  disabled={isDisabled}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Avatar Url"
                  inputProps={{
                    ...register("avatarURL"),
                  }}
                  disabled={isDisabled}
                />
              </Grid>
            </Grid>
          </form>
        ) : (
          renderDisplayContent()
        )}
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
