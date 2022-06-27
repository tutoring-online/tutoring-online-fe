import { Button, Dialog, DialogContent, Grid, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import TextField from "components/Form/TextField";
import CustomDialogTitle from "components/Dialog/custom/CustomDialogTitle";
import CustomDialogActions from "components/Dialog/custom/CustomDialogActions";

import yup from "helpers/yupGlobal";
import { yupResolver } from "@hookform/resolvers/yup";
import { CRUD_MODE } from "settings/setting";
import RadioGroupField from "components/Form/RadioGroupField";
import { LIST_SUBJECT_STATUS } from "settings/subject-setting";
import { renderSubjectStatus } from "settings/subject-setting";
import { SUBJECT_STATUSES } from "settings/subject-setting";
import SelectField from "components/Form/SelectField";
import useCategoryList from "hooks/category/useCategoryList";

const schema = yup.object().shape({
  code: yup.string().required("Code is required"),
  name: yup.string().required("Name is required"),
  categoryId: yup.string().nullable().required("Category is required"),
});

const getDefaultValues = (subject) => {
  if (!subject)
    return {
      status: SUBJECT_STATUSES.ACTIVE,
    };

  return {
    ...subject,
  };
};

export default function SubjectDetailDialog({
  open,
  onClose,
  onSubmit,
  subject,
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
    control,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: getDefaultValues(subject),
    resolver: yupResolver(schema),
  });

  const { categoryList } = useCategoryList();

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

  function renderDisplayContent() {
    return (
      <div>
        <Grid container paddingLeft="4rem">
          <Grid item xs={12} lg={6} marginBottom="20px">
            <Typography fontSize={18} fontWeight="bold">
              Name:
            </Typography>
            <Typography>{subject?.name || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} lg={6} marginBottom="20px">
            <Typography fontSize={18} fontWeight="bold">
              Status:
            </Typography>
            <Typography>DKJGDL:GKJDLKGJSDLFGKJDFGLKJ</Typography>
          </Grid>
          <Grid item xs={12} lg={12} marginBottom="20px">
            <Typography fontSize={18} fontWeight="bold">
              Description:
            </Typography>
            <Typography>SDFHSKFJSDKLFJSLDKFJ</Typography>
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
                  label="Code"
                  required={true}
                  inputProps={{
                    ...register("code"),
                  }}
                  error={errors.code?.message}
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
                <SelectField
                  label="Category"
                  name="categoryId"
                  control={control}
                  required={true}
                  options={categoryList.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  error={errors.categoryId?.message}
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
                    type: "date",
                  }}
                  error={errors.description?.message}
                  disabled={isDisabled}
                />
              </Grid>

              <Grid item xs={12}>
                <RadioGroupField
                  label="Status"
                  name="status"
                  row={true}
                  options={LIST_SUBJECT_STATUS.map((item) => ({
                    ...item,
                    label: renderSubjectStatus(item.value),
                  }))}
                  control={control}
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
