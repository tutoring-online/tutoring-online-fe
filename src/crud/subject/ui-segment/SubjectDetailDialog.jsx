import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//Mui
import { Dialog, DialogContent } from "@mui/material";

//Core component
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

const schema = yup.object().shape({
	code: yup.string().required("Code is required"),
	name: yup.string().required("Name is required"),
	categoryId: yup.string().nullable().required("Category is required"),
});

const getDefaultValues = (subject) => {
	if (!subject) return {};
	return {
		...subject,
	};
};

export default function SubjectDetailDialog({
	open,
	onClose,
	onSubmit,
	loadingSubmit,
	loadingDetail,

	mode,
	subject,
	title = "Subject Detail",
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

	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		reset(getDefaultValues(subject));
	}, [subject, reset]);

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

	const renderContent = () => isEditing ? (
		<EditingContent
			control={control}
			register={register}
			errors={errors}
			onSubmit={handleSubmit(preparedBeforeSubmit)}
		/>
	) : (
		<ViewMode subject={subject} />
	)


	return (
		<Dialog open={open} onClose={onClose} maxWidth="md">
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
	);
}
