import React from 'react'
import { Avatar, FormLabel, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { genderOptions } from 'settings/setting';


//Component
import NoInformation from 'components/Text/NoInformation';
import DisplayField from 'components/Form/DisplayField';
import RadioGroupField from 'components/Form/RadioGroupField';
import TextField from 'components/Form/TextField';
import GroupBox from 'components/Form/GroupBox';

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

export default function EditingContent({
    tutor,
    control,
    register,
    errors,
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

            </Grid>
        </form>
    )
}
