import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//Mui
import { Dialog, DialogContent } from "@mui/material";

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
import EditButton from "components/Buttons/EditButton";
import CancelButton from "components/Buttons/CancelButton";
import SubmitButton from "components/Buttons/SubmitButton";

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
    onClose,
    onSubmit,
    loadingSubmit,
    loadingDetail,

    mode,
    admin,
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
        reset(getDefaultValues(admin));
    }, [admin, reset]);

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
        const onSuccess = () => setIsEditing(false);
        
        onSubmit && onSubmit(preparedData, onSuccess);
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

<<<<<<< HEAD
    const renderContent = () => isEditing ? (
        <EditingContent
            admin={admin}
            control={control}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(preparedBeforeSubmit)}
            isUpdateMode={isUpdateMode()}
        />
    ) : (
        <ViewMode admin={admin} />
    )
=======
  const cancelEdit = () => {
    setIsEditing(false);    
    reset();
    console.log(admin);
  };
>>>>>>> 6d4e1a6 (rp)

    return (
<<<<<<< HEAD
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
                        <CancelButton onClick={cancelEdit} />
                        <SubmitButton
                            onClick={handleSubmit(preparedBeforeSubmit)}
                            text={submitButton.text}
                            loading={loadingSubmit}
                        />
                    </>
                ) : (
                    <EditButton onClick={enableEdit} />
                )}
            </CustomDialogActions>
        </Dialog>
=======
      <div className="profile-view">
        <Grid container paddingLeft="4rem">
          <Grid item xs={12} lg={6} marginBottom="20px">
            <Typography fontSize={18} fontWeight="bold">
              Name:
            </Typography>
            <Typography>Name Example</Typography>
            {/* {admin.xxxx} */}
          </Grid>          
          <Grid item xs={12} lg={6} marginBottom="20px">
            <Typography fontSize={18} fontWeight="bold">
              Email:
            </Typography>
            <Typography>Example@gmail.com</Typography>
            {/* {admin.xxxx} */}
          </Grid>
          <Grid item xs={12} lg={6} marginBottom="20px">
            <Typography fontSize={18} fontWeight="bold">
              Birthday:
            </Typography>
            <Typography>2/2/2222</Typography>
            {/* {admin.xxxx} */}
          </Grid>
          <Grid item xs={12} lg={6} marginBottom="20px"v>
            <Typography fontSize={18} fontWeight="bold">
              Phone:
            </Typography>
            <Typography>0123456789</Typography>
            {/* {admin.xxxx} */}
          </Grid>
          <Grid item xs={12} lg={6} marginBottom="20px">
            <Typography fontSize={18} fontWeight="bold" on>
              Address
            </Typography>
            <Typography>Address Example</Typography>
            {/* {admin.xxxx} */}
          </Grid>
          <Grid item xs={12} lg={6} marginBottom="20px">
            <Typography fontSize={18} fontWeight="bold">
              AvatarURL:
            </Typography>
            <Typography>;lfkj;dflk;dflk</Typography>
            {/* {admin.xxxx} */}
          </Grid>
        </Grid>
      </div>
>>>>>>> 6d4e1a6 (rp)
    );
}
