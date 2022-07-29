import React, { useEffect, useState } from 'react'
import { Avatar, Chip, FormLabel, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { genderOptions } from 'settings/setting';
import ClearIcon from '@mui/icons-material/Clear';

//Component
import NoInformation from 'components/Text/NoInformation';
import DisplayField from 'components/Form/DisplayField';
import RadioGroupField from 'components/Form/RadioGroupField';
import TextField from 'components/Form/TextField';
import GroupBox from 'components/Form/GroupBox';
import { isAvailableArray } from 'helpers/arrayUtils';
import useSubjectList from 'hooks/subject/useSubjectList';
import SelectField from 'components/Form/SelectField';
import { useForm, useWatch } from 'react-hook-form';
import useTutorSubjectList from 'hooks/tutor-subject/useTutorSubjectList';
import { TUTOR_SUBJECT_STATUSES } from 'settings/tutor-subject-setting';

const BasicInfo = ({
    tutor,
    control,
    register,
    errors,
}) => (
    <GroupBox>
        <Grid container>
            <Grid item xs={12}>
                <FormLabel sx={{ fontSize: "18px" }}>
                    Basic info
                </FormLabel>
            </Grid>

            <Grid item xs={12} lg={6}>
                <TextField
                    label="Name"
                    required={true}
                    inputProps={{
                        ...register("name"),
                    }}
                    error={errors.name?.message}
                />
            </Grid>

            <Grid item xs={12} lg={6}>
                <TextField
                    label="Birthday"
                    inputProps={{
                        type: "date",
                        ...register("birthday"),
                    }}
                />
            </Grid>

            <Grid item xs={12} lg={6}>
                <RadioGroupField
                    label="Gender"
                    name="gender"
                    row={true}
                    options={genderOptions}
                    control={control}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label={
                        <Box
                            display="flex"
                            flexWrap="nowrap"
                            alignItems="flex-end"
                        >
                            Avatar
                            <Avatar
                                src={tutor?.avatarURL}
                                alt="avatar"
                                sx={{ width: 24, height: 24, marginLeft: "0.5rem" }}
                            />
                        </Box>
                    }
                    inputProps={{
                        ...register("avatarURL"),
                        placeholder: "Url to get the image"
                    }}
                />
            </Grid>
        </Grid>
    </GroupBox>
)

const Contact = ({
    tutor,
    register,
    errors,
    isUpdateMode,
}) => (
    <GroupBox>
        <Grid container>
            <Grid item xs={12}>
                <FormLabel sx={{ fontSize: "18px" }}>
                    Contact
                </FormLabel>
            </Grid>

            <Grid item xs={12} lg={6}>
                {isUpdateMode ?
                    <DisplayField
                        label="Email"
                        value={tutor?.email || <NoInformation />}
                    />
                    :
                    <TextField
                        label="Email"
                        required={true}
                        inputProps={{
                            ...register("email"),
                            autoFocus: true,
                        }}
                        error={errors.email?.message}
                    />
                }
            </Grid>
            <Grid item xs={12} lg={6}>
                <TextField
                    label="Phone"
                    inputProps={{
                        ...register("phone"),
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Link meeting"
                    inputProps={{
                        ...register("meetingUrl"),
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Address"
                    inputProps={{
                        ...register("address"),
                    }}
                />
            </Grid>
        </Grid>
    </GroupBox>
)

const getSubjectOptions = (subjectList) => {
    return isAvailableArray(subjectList) ? subjectList.map(item => ({
        label: item.name,
        value: item.id
    })) : null;
}

const Subject = ({ tutor, setNewTutorSubjectIds }) => {

    const { tutorSubjectList } = useTutorSubjectList();
    const { subjectList } = useSubjectList();
    const [tutorSubjectIds, setTutorSubjectIds] = useState([]);

    useEffect(() => {
        if (!isAvailableArray(tutorSubjectList) || tutor?.id == null) {
            setTutorSubjectIds([]);
            return;
        }

        setTutorSubjectIds(() => {
            return tutorSubjectList.filter(item =>
                item.tutorId === tutor?.id && item.status !== TUTOR_SUBJECT_STATUSES.DELETED
            ).map(item => item.subjectId);
        })
    }, [tutor, tutorSubjectList])

    const { control } = useForm({
        defaultValues: {
            subjectId: null
        },
    });

    const subjectId = useWatch({ control, name: "subjectId" });

    useEffect(() => {
        if (!subjectId) return;

        setTutorSubjectIds((prev) => {
            const alreadyExist = isAvailableArray(prev) && prev.find(item => item === subjectId);
            if (alreadyExist) return prev;

            prev.push(subjectId);
            return [...prev];
        })
    }, [subjectId])

    useEffect(() => {
        setNewTutorSubjectIds && setNewTutorSubjectIds(tutorSubjectIds);
    }, [setNewTutorSubjectIds, tutorSubjectIds])


    const getSubjectName = (subjectId) => {
        const subject = isAvailableArray(subjectList) && subjectList.find(item => item.id === subjectId);
        return subject?.name || "N/A";
    }

    const removeSubjectId = (subjectId) => {
        setTutorSubjectIds(prev => prev.filter(item => item !== subjectId));
    }

    return (
        <GroupBox>
            <Grid container>
                <Grid item xs={12}>
                    <FormLabel sx={{ fontSize: "18px" }}>
                        Subject Info
                    </FormLabel>
                </Grid>
                <Grid item xs={12}>
                    <SelectField
                        inputProps={{
                            placeholder: "Find subject"
                        }}
                        name="subjectId"
                        control={control}
                        options={getSubjectOptions(subjectList)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box
                        display="flex"
                        alignItems="center"
                        flexDirection="row"
                        flexWrap="wrap"
                        gap="1rem"
                    >
                        {isAvailableArray(tutorSubjectIds) ? (
                            tutorSubjectIds.map(subjectId =>
                                <Chip
                                    key={subjectId}
                                    label={getSubjectName(subjectId)}
                                    component="button"
                                    type="button"
                                    onDelete={() => removeSubjectId(subjectId)}
                                    deleteIcon={<ClearIcon />}
                                />
                            )) : (<i>No subject</i>)
                        }
                    </Box>
                </Grid>
            </Grid>
        </GroupBox>
    )
}

export default function EditingContent({
    tutor,
    control,
    register,
    errors,
    setNewTutorSubjectIds,
    isUpdateMode,
    onSubmit,
}) {

    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <BasicInfo
                        tutor={tutor}
                        control={control}
                        register={register}
                        errors={errors}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Contact
                        tutor={tutor}
                        register={register}
                        errors={errors}
                        isUpdateMode={isUpdateMode}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Subject
                        tutor={tutor}
                        errors={errors}
                        setNewTutorSubjectIds={setNewTutorSubjectIds}
                    />
                </Grid>
            </Grid>
        </form>
    )
}
