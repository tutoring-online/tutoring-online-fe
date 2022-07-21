import React, { useEffect, useState } from 'react'

//Component
import TextField from 'components/Form/TextField';
import GroupBox from 'components/Form/GroupBox';
import SelectField from 'components/Form/SelectField';
import useSubjectList from 'hooks/subject/useSubjectList';
import { isAvailableArray } from 'helpers/arrayUtils';
import { DURATION_OPTIONS } from 'settings/syllabus-setting';
import { FormLabel, Grid } from '@mui/material';
import FakeInputField from 'components/Form/FakeInputField';
import BrowserAvatar from 'components/BrowserFile/BrowserAvatar';
import { Box } from '@mui/system';
import PreviewFileArea from 'components/BrowserFile/PreviewFile';

const getSubjectOptions = (subjectList) => {
    return isAvailableArray(subjectList) ? subjectList.map(subject => ({
        label: subject.name,
        value: subject.id
    })) : [];
}

const BasicInfo = ({
    syllabus,
    control,
    register,
    errors,
    isUpdateMode,
    setSyllabusImage
}) => {

    const { subjectList } = useSubjectList();
    const [file, setFile] = useState(null);

    useEffect(() => {
        setSyllabusImage && setSyllabusImage(file);
    }, [file, setSyllabusImage])


    const handleChangeFile = (files) => {
        if (files && files[0]) {
            setFile(files[0]);
        }
    };

    const handleClearFile = () => {
        setFile(null);
    }

    return (
        (
            <GroupBox>
                <Grid container>
                    <Grid item xs={12}>
                        <FormLabel sx={{ fontSize: "18px" }}>
                            Basic info
                        </FormLabel>
                    </Grid>

                    <Grid item xs={4}>
                        <Grid
                            container
                            spacing={2}
                            height="100%"
                        >
                            <Grid item xs={12}>
                                <Box
                                    height="100%"
                                    width="100%"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    borderRadius="4px"
                                    boxShadow="0 1px 3px rgb(50, 50, 93,0.15), 0 1px 0 rgb(0, 0, 0,0.02)"
                                >
                                    {file ?
                                        <PreviewFileArea
                                            file={file}
                                            handleClear={handleClearFile}
                                        />
                                        :
                                        <BrowserAvatar
                                            text="Upload Image"
                                            onChange={handleChangeFile}
                                        />
                                    }
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={8}>
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid item xs={12}>
                                {isUpdateMode ?
                                    <FakeInputField
                                        label="Name"
                                        value={syllabus?.name}
                                    />
                                    :
                                    <TextField
                                        label="Name"
                                        required={true}
                                        inputProps={{
                                            ...register("name")
                                        }}
                                        error={errors.name?.message}
                                    />
                                }
                            </Grid>

                            <Grid item xs={12}>
                                {isUpdateMode ?
                                    <FakeInputField
                                        label="Subject"
                                        value={syllabus?.subject?.name}
                                    />
                                    :
                                    <SelectField
                                        label="Subject"
                                        required={true}
                                        name="subjectId"
                                        control={control}
                                        options={getSubjectOptions(subjectList)}
                                        error={errors.subjectId?.message}
                                    />
                                }
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        {isUpdateMode ?
                            <FakeInputField
                                label="Duration"
                                value={`${syllabus?.totalLessons || 0} lessons`}
                            />
                            :
                            <SelectField
                                label="Duration"
                                required={true}
                                name="totalLessons"
                                control={control}
                                options={DURATION_OPTIONS}
                                error={errors.totalLessons?.message}
                            />
                        }
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <TextField
                            label="Price"
                            required={true}
                            inputProps={{
                                ...register("price"),
                                type: "number"
                            }}
                            error={errors.price?.message}
                        />
                    </Grid>
                </Grid>
            </GroupBox>
        )
    )
}

const Description = ({
    register,
    errors,
}) => {

    return (
        (
            <GroupBox>
                <Grid container>
                    <Grid item xs={12}>
                        <FormLabel sx={{ fontSize: "18px" }}>
                            Description
                        </FormLabel>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required={true}
                            inputProps={{
                                ...register("description"),
                                multiline: true,
                                rows: 4,
                            }}
                            error={errors.description?.message}
                        />
                    </Grid>
                </Grid>
            </GroupBox>
        )
    )
}

export default function EditingContent({
    syllabus,
    control,
    register,
    errors,
    isUpdateMode,
    onSubmit,
    setSyllabusImage
}) {

    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <BasicInfo
                        syllabus={syllabus}
                        control={control}
                        register={register}
                        errors={errors}
                        isUpdateMode={isUpdateMode}
                        setSyllabusImage={setSyllabusImage}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Description
                        register={register}
                        errors={errors}
                    />
                </Grid>
            </Grid>
        </form>
    )
}
