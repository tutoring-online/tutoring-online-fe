import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//Mui
import { Dialog, DialogContent } from "@mui/material";

//Core components
import CustomDialogTitle from "components/Dialog/custom/CustomDialogTitle";
import CustomDialogActions from "components/Dialog/custom/CustomDialogActions";

import EditingContent from "./EditingContent";
import ViewMode from "./ViewMode";
import ViewModeSkeleton from "./ViewModeSkeleton";

import CancelButton from "components/Buttons/CancelButton";
import SubmitButton from "components/Buttons/SubmitButton";
import EditButton from "components/Buttons/EditButton";

//Helpers
import yup from "helpers/yupGlobal";
import { CRUD_MODE } from "settings/setting";
import useToBase64 from "hooks/file/useToBase64";
import BackDropLoader from "components/Loading/BackDropLoader";

const schema = yup.object().shape({
    name: yup.string().required("Name is required").nullable(),
    subjectId: yup.string().required("Subject is required").nullable(),
    totalLessons: yup.string().required("Duration is required").nullable(),
    price: yup.string().required("Price is required").nullable(),
    description: yup
        .string()
        .test("len", "Maximum 1000 characters.", (input) => input.length <= 1000),
});

const getDefaultValues = (syllabus) => {
    if (!syllabus) return {
        name: "",
        subjectId: null,
        totalLessons: null,
        price: null,
        description: ""
    };

    return {
        ...syllabus,
        subjectId: syllabus?.subjectId || syllabus?.subject?.id
    }
}

export default function SyllabusDetailDialog({
    open,
    onClose,
    onSubmit,
    loadingSubmit,
    loadingDetail,

    mode,
    syllabus,
    title = "Syllabus Detail",
    submitButton = {
        text: "Confirm"
    }
}) {

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
        mode: "onSubmit",
        reValidateMode: "onBlur",
        defaultValues: getDefaultValues(syllabus),
        resolver: yupResolver(schema)
    })

    const [syllabusImage, setSyllabusImage] = useState(null);
    const { base64, loading: loadingConvert } = useToBase64(syllabusImage);

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        reset(getDefaultValues(syllabus));
    }, [syllabus, reset]);

    useEffect(() => {
        setIsEditing(() => {
            if (mode === CRUD_MODE.create) return true;
            if (mode === CRUD_MODE.edit) return true;
            return false;
        })
    }, [mode])

    const preparedBeforeSubmit = (data) => {
        const preparedData = {
            ...data,
            ...(base64 ? { image: base64 } : {})
        }
        const onSuccess = () => setIsEditing(false);
        onSubmit && onSubmit(preparedData, onSuccess);
    }

    const enableEdit = () => {
        setIsEditing(true);
    }

    const cancelEdit = () => {
        setIsEditing(false);
        reset();
    }

    const renderContent = () => isEditing ? (
        <EditingContent
            control={control}
            isUpdateMode={mode !== CRUD_MODE.create}
            syllabus={syllabus}
            register={register}
            errors={errors}
            setSyllabusImage={setSyllabusImage}
            onSubmit={handleSubmit(preparedBeforeSubmit)}
        />
    ) : (
        <ViewMode syllabus={syllabus} />
    )

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

            <BackDropLoader
                open={loadingConvert}
            />
        </Dialog>
    )
}
